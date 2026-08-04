/*
 * Builds the favicons from src/assets/something.png.
 *
 * No image tooling in the project, so this decodes the source PNG by hand
 * (inflate, undo the per-scanline filters), crops, resamples and re-encodes.
 * Run with `npm run favicon`.
 *
 * Framing note: SOMETHING is a very tall, very narrow figure. Fitting the
 * whole body into a square leaves it a two-pixel smudge at 32px, so the crop
 * is a square taken from the top — the head and its eye, which is the part
 * that actually reads at favicon size.
 */
import { deflateSync, inflateSync } from 'node:zlib'
import { readFileSync, writeFileSync } from 'node:fs'
import { Buffer } from 'node:buffer'

const SOURCE = new URL('../src/assets/something.png', import.meta.url)
// 180 doubles as the Apple touch icon and as the source browsers downscale
// for high-DPI tabs; 32 is hand-sized for the tab itself.
const SIZES = [180, 32]
const PADDING = 0.22 // share of the crop left as breathing room each side

// ---------------------------------------------------------------- decoding

function paeth(a, b, c) {
  const p = a + b - c
  const pa = Math.abs(p - a)
  const pb = Math.abs(p - b)
  const pc = Math.abs(p - c)
  if (pa <= pb && pa <= pc) return a
  return pb <= pc ? b : c
}

/** Decode an 8-bit, non-interlaced PNG into flat RGBA. */
function decodePng(buf) {
  const width = buf.readUInt32BE(16)
  const height = buf.readUInt32BE(20)
  const colorType = buf[25]
  const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[colorType]
  if (!channels) throw new Error(`unsupported colour type ${colorType}`)
  if (buf[28] !== 0) throw new Error('interlaced PNGs not supported')

  const idat = []
  let p = 8
  while (p < buf.length) {
    const len = buf.readUInt32BE(p)
    const type = buf.toString('ascii', p + 4, p + 8)
    if (type === 'IDAT') idat.push(buf.subarray(p + 8, p + 8 + len))
    p += 12 + len
  }

  const raw = inflateSync(Buffer.concat(idat))
  const stride = width * channels
  const out = Buffer.alloc(width * height * 4)
  let prev = Buffer.alloc(stride)
  let cursor = 0

  for (let y = 0; y < height; y += 1) {
    const filter = raw[cursor]
    cursor += 1
    const line = Buffer.from(raw.subarray(cursor, cursor + stride))
    cursor += stride

    for (let i = 0; i < stride; i += 1) {
      const a = i >= channels ? line[i - channels] : 0
      const b = prev[i]
      const c = i >= channels ? prev[i - channels] : 0
      if (filter === 1) line[i] = (line[i] + a) & 0xff
      else if (filter === 2) line[i] = (line[i] + b) & 0xff
      else if (filter === 3) line[i] = (line[i] + ((a + b) >> 1)) & 0xff
      else if (filter === 4) line[i] = (line[i] + paeth(a, b, c)) & 0xff
    }
    prev = line

    for (let x = 0; x < width; x += 1) {
      const s = x * channels
      const d = (y * width + x) * 4
      let r
      let g
      let bl
      let al = 255
      if (channels === 1) { r = g = bl = line[s] }
      else if (channels === 2) { r = g = bl = line[s]; al = line[s + 1] }
      else if (channels === 3) { r = line[s]; g = line[s + 1]; bl = line[s + 2] }
      else { r = line[s]; g = line[s + 1]; bl = line[s + 2]; al = line[s + 3] }
      out[d] = r; out[d + 1] = g; out[d + 2] = bl; out[d + 3] = al
    }
  }

  return { width, height, data: out }
}

// ---------------------------------------------------------------- encoding

const CRC_TABLE = (() => {
  const table = new Int32Array(256)
  for (let n = 0; n < 256; n += 1) {
    let c = n
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c
  }
  return table
})()

function crc32(buffer) {
  let c = -1
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ -1) >>> 0
}

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([length, body, crc])
}

function encodePng(width, height, rgba) {
  const raw = Buffer.alloc(height * (width * 4 + 1))
  let cursor = 0
  for (let y = 0; y < height; y += 1) {
    raw[cursor] = 0
    cursor += 1
    rgba.copy(raw, cursor, y * width * 4, (y + 1) * width * 4)
    cursor += width * 4
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// ---------------------------------------------------------------- resample

/**
 * Box-filter downscale. Colour is averaged premultiplied by alpha, so the
 * transparent surround cannot bleed dark fringes into the edges.
 */
function resample(src, sw, sh, box, size) {
  const out = Buffer.alloc(size * size * 4)
  const scale = box.side / size

  for (let y = 0; y < size; y += 1) {
    const y0 = box.y + y * scale
    const y1 = y0 + scale
    for (let x = 0; x < size; x += 1) {
      const x0 = box.x + x * scale
      const x1 = x0 + scale

      let r = 0; let g = 0; let b = 0; let a = 0; let n = 0
      for (let sy = Math.floor(y0); sy < Math.ceil(y1); sy += 1) {
        if (sy < 0 || sy >= sh) { n += 1; continue }
        for (let sx = Math.floor(x0); sx < Math.ceil(x1); sx += 1) {
          if (sx < 0 || sx >= sw) { n += 1; continue }
          const s = (sy * sw + sx) * 4
          const al = src[s + 3] / 255
          r += src[s] * al; g += src[s + 1] * al; b += src[s + 2] * al
          a += src[s + 3]
          n += 1
        }
      }
      if (!n) n = 1
      const d = (y * size + x) * 4
      const alpha = a / n
      const un = alpha > 0 ? 255 / alpha : 0
      out[d] = Math.min(255, Math.round((r / n) * un))
      out[d + 1] = Math.min(255, Math.round((g / n) * un))
      out[d + 2] = Math.min(255, Math.round((b / n) * un))
      out[d + 3] = Math.round(alpha)
    }
  }
  return out
}

// ---------------------------------------------------------------- build

const { width, height, data } = decodePng(readFileSync(SOURCE))

// content bounds
let minX = width; let minY = height; let maxX = -1; let maxY = -1
for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    if (data[(y * width + x) * 4 + 3] > 8) {
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
}
const contentW = maxX - minX + 1
const contentH = maxY - minY + 1

// Square crop taken from the top of the figure: the head, not the whole body.
// Wider than the figure so the head shape closes off inside the frame instead
// of being sheared at the eye, and centred horizontally on the silhouette.
const side = Math.round(contentW * (1 + PADDING * 2))
const box = {
  x: Math.round(minX + contentW / 2 - side / 2),
  y: minY - Math.round(contentW * 0.1),
  side,
}

console.log(`source ${width}x${height}, content ${contentW}x${contentH} at ${minX},${minY}`)
console.log(`crop ${side}x${side} from ${box.x},${box.y}`)

for (const size of SIZES) {
  const rgba = resample(data, width, height, box, size)
  const name = `favicon-${size}.png`
  writeFileSync(new URL(`../public/${name}`, import.meta.url), encodePng(size, size, rgba))
  console.log(`wrote public/${name}`)
}
