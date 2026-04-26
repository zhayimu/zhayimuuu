import { Photo } from './types';

/**
 * UPLOAD YOUR PHOTOS HERE:
 * 1. Place your images in the `public/images` folder.
 * 2. Update the `url` below to `/images/your-file-name.jpg`.
 */

export const PHOTOS: Photo[] = [
  {
    id: "user-hero",
    category: "Weddings",
    url: "/images/home_hero.jpg"
  },
  {
    id: "user-about",
    category: "Official Events",
    url: "/images/about_me.jpg"
  },
  // WEDDINGS (Placeholder for future uploads)
  // { id: "w1", category: "Weddings", url: "/images/wedding/w1.jpg" },

  // OFFICIAL EVENTS (Files e1-e10 in public/images/events/)
  { id: "o1", category: "Official Events", url: "/images/events/e1.jpg" },
  { id: "o2", category: "Official Events", url: "/images/events/e2.jpg" },
  { id: "o3", category: "Official Events", url: "/images/events/e3.jpg" },
  { id: "o4", category: "Official Events", url: "/images/events/e4.jpg" },
  { id: "o5", category: "Official Events", url: "/images/events/e5.jpg" },
  { id: "o6", category: "Official Events", url: "/images/events/e6.jpg" },
  { id: "o7", category: "Official Events", url: "/images/events/e7.jpg" },
  { id: "o8", category: "Official Events", url: "/images/events/e8.jpg" },
  { id: "o9", category: "Official Events", url: "/images/events/e9.jpg" },
  { id: "o10", category: "Official Events", url: "/images/events/e10.jpg" },

  // CONVOCATION (Files c1-c10 in public/images/convo/ - c3 and c7 were deleted)
  { id: "c1", category: "Convocation", url: "/images/convo/c1.png" },
  { id: "c2", category: "Convocation", url: "/images/convo/c2.png" },
  { id: "c4", category: "Convocation", url: "/images/convo/c4.png" },
  { id: "c5", category: "Convocation", url: "/images/convo/c5.png" },
  { id: "c6", category: "Convocation", url: "/images/convo/c6.png" },
  { id: "c8", category: "Convocation", url: "/images/convo/c8.png" },
  { id: "c9", category: "Convocation", url: "/images/convo/c9.png" },
  { id: "c10", category: "Convocation", url: "/images/convo/c10.png" }
];
