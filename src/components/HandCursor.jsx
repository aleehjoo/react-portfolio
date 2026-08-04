import pointer from '../assets/finger-pointer.gif'

/*
 * The menu cursor.
 *
 * An earlier version cropped this GIF to the bounding box of its first frame.
 * That clipped the fingertip: parsing the file's frame descriptors shows the
 * union of all frames covers the full 800x200 canvas, so the hand moves
 * outside any box measured from one frame.
 *
 * So nothing is cropped. The whole frame is drawn and the surrounding
 * transparent padding is pulled back in with negative margins, which shift
 * layout without ever clipping the image.
 */
// The right margin is -10px rather than -24px: at full extension the
// fingertip reaches further right than it does at rest, and was touching
// the label.
const HEIGHT = 22

export default function HandCursor({ className = '' }) {
  return (
    <img
      src={pointer}
      alt=""
      aria-hidden="true"
      style={{ height: `${HEIGHT}px` }}
      className={`ml-[-14px] mr-[-10px] w-auto max-w-none shrink-0 ${className}`}
    />
  )
}
