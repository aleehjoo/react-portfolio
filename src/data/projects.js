import shotOne from '../assets/project1.png'
import shotTwo from '../assets/project2.png'
import shotThree from '../assets/project3.png'

// `href` is the link the screenshot opens. Leave it null when there is no
// public URL — the card still renders, the screenshot just isn't clickable.
export const projects = [
  {
    id: 'jd-gym',
    title: "JD'S MUSCLE FLEX GYM",
    description:
      "Landing page for a gym in Tiaong, Quezon. A single scrolling marketing site with animated sections and a smoothie menu; there is no online payment, so the membership calls to action hand off to the gym's Facebook page, which is where sign-ups actually happen.",
    tags: ['REACT', 'VITE', 'TAILWIND', 'FRAMER MOTION'],
    image: shotOne,
    href: 'https://github.com/aleehjoo/jd-gym',
  },
  {
    id: 'apo-idon-inventory',
    title: 'APO IDON INVENTORY',
    description:
      'Role-based stock system for a business that had been counting by hand. Admins and submitters get separate views behind invite-only auth, stock movements apply as atomic deltas so two people counting at once cannot corrupt a total, and item photos are attached per entry. Access is enforced in Postgres itself with row-level security rather than trusted to the UI.',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'SUPABASE', 'SHADCN/UI'],
    image: shotTwo,
    href: 'https://github.com/aleehjoo/apo-idon-inventory',
  },
  {
    id: 'travel-agency',
    title: 'TRAVEL AGENCY',
    description:
      'Server-rendered travel agency dashboard built on React Router 7 in framework mode. Appwrite handles auth and data, Syncfusion supplies the grids, charts and maps, the Gemini API generates trip itineraries, and the whole thing ships in a Docker image with Sentry wired up for error tracking.',
    tags: ['REACT ROUTER', 'TYPESCRIPT', 'APPWRITE', 'GEMINI'],
    image: shotThree,
    href: 'https://github.com/aleehjoo/travel-agency',
  },
]
