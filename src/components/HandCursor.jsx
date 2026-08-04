import pointer from '../assets/finger-pointer.gif'

/*
 * The pointing hand, used both as the menu cursor and as the dialogue
 * window's "there is more" marker.
 *
 * An earlier version cropped this GIF to the bounding box of its first frame.
 * That clipped the fingertip: parsing the file's frame descriptors shows the
 * union of all frames covers the full 800x200 canvas, so the hand moves
 * outside any box measured from one frame.
 *
 * So nothing is cropped — the whole frame is always drawn. Callers pull the
 * surrounding transparent padding back with margins, which shift layout
 * without ever clipping the image.
 */
export default function HandCursor({ height = 22, className = '' }) {
  return (
    <img
      src={pointer}
      alt=""
      aria-hidden="true"
      style={{ height: `${height}px` }}
      className={`w-auto max-w-none shrink-0 ${className}`}
    />
  )
}
