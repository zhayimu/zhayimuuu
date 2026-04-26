# Zhayimuuu Photography Portfolio

A cinematic, modern photography portfolio for Zaim, a freelance photographer and videographer based in Kuala Lumpur.

## Features

- **Cinematic Visuals**: High-impact hero section and minimalist design.
- **Horizontal Scrolling Portfolios**: Automatic parallax-style scrolling rows that move as you scroll down the page.
- **Manual Navigation**: Left/Right buttons for manual exploration of each event category.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Service Categories**:
  - **Weddings**: Malaysia-based wedding coverage.
  - **Official Events**: Professional documentation for galas and forums.
  - **Convocation**: Personalized graduation shoots.
- **Contact Integration**: Direct WhatsApp linkage and social media connectivity.

## Tech Stack

- **React**: Frontend framework.
- **TypeScript**: Type safety and better developer experience.
- **Tailwind CSS**: Utility-first styling.
- **Motion (Framer Motion)**: For butter-smooth animations and scroll effects.
- **Lucide React**: For beautiful, minimalist iconography.

## Project Structure

- `src/App.tsx`: Main application logic and UI components.
- `src/data.ts`: Centralized data for photos and categories.
- `src/index.css`: Global styles and custom Tailwind extensions.
- `src/types.ts`: TypeScript interfaces for the project.

## How to Customize

### Adding Photos
Edit `src/data.ts` and add objects to the `PHOTOS` array:
```typescript
{
  id: "unique-id",
  title: "Photo Title",
  category: "Weddings", // Must match Category type
  url: "https://your-image-url.com",
  description: "Short description"
}
```

### Changing Profile Info
Edit the "About Me" section in `src/App.tsx` (found around the `#about` id).

## Credits
Designed and Developed for zhayimu.
