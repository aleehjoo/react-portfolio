/*
 * Writes the PWA icon PNGs by hand.
 *
 * The project has no image tooling, and installable manifests need real PNGs
 * at 192px and 512px. So: define the lightbulb as a pixel grid, scale it up,
 * deflate the raw scanlines with node:zlib, and wrap the result in PNG chunks.
 * No dependencies. Run with `npm run icons`.
 */
import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'
import { Buffer } from 'node:buffer'

// Every row must be exactly as long as the array, so the sprite stays square.
const SPRITE = [
  '................',
  '.....######.....',
  '....##....##....',
  '...##......##...',
  '...##......##...',
  '...##......##...',
  '...##......##...',
  '....##....##....',
  '.....######.....',
  '.....#....#.....',
  '.....######.....',
  '.....#....#.....',
  '.....######.....',
  '......####......',
  '......####......',
  '................',
]

const CRC_TABLE = (() => {
  const table = new Int32Array(256)
  for (let n = 0; n < 256; n += 1) {
    let c = n
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    table[n] = c
  }
  return table
})()

function crc32(buffer) {
  let c = -1
  for (const byte of buffer) {
    c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  }
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

function renderPng(size) {
  const scale = size / SPRITE.length
  // Each scanline is one filter byte (0 = none) followed by RGBA pixels.
  const raw = Buffer.alloc(size * (size * 4 + 1))
  let cursor = 0

  for (let y = 0; y < size; y += 1) {
    raw[cursor] = 0
    cursor += 1
    const row = SPRITE[Math.floor(y / scale)]
    for (let x = 0; x < size; x += 1) {
      const value = row[Math.floor(x / scale)] === '#' ? 0 : 255
      raw[cursor] = value
      raw[cursor + 1] = value
      raw[cursor + 2] = value
      raw[cursor + 3] = 255
      cursor += 4
    }
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type: RGBA
  ihdr[10] = 0 // compression
  ihdr[11] = 0 // filter
  ihdr[12] = 0 // interlace

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

for (const size of [192, 512]) {
  const target = new URL(`../public/pwa-${size}x${size}.png`, import.meta.url)
  writeFileSync(target, renderPng(size))
  console.log(`wrote public/pwa-${size}x${size}.png`)
}
