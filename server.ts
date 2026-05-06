import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.disable("x-powered-by");

  // Add Security headers
  app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: blob: https://images.unsplash.com https://i.ibb.co https://*.ibb.co; " +
      "connect-src 'self' ws: wss: https://vitals.vercel-insights.com; " +
      "object-src 'none'; " +
      "base-uri 'self'; " +
      "frame-ancestors 'self' https://aistudio.google.com;"
    );
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
    next();
  });

  // Mock Photo Data API
  const photos = [
    {
      id: "1",
      title: "Grand Wedding Reception",
      category: "Weddings",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2070",
      description: "Capturing the elegance and joy of a traditional Malaysian wedding."
    },
    {
      id: "2",
      title: "Corporate Gala Dinner",
      category: "Official Events",
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069",
      description: "Professional coverage of key corporate milestones and galas."
    },
    {
      id: "3",
      title: "The Final Walk",
      category: "Convocation",
      url: "https://images.unsplash.com/photo-152305085306e-8c3d3e7d9f39?auto=format&fit=crop&q=80&w=2070",
      description: "Celebrating academic success and graduation milestones."
    },
    {
      id: "4",
      title: "Eternal Promises",
      category: "Weddings",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2069",
      description: "Intimate moments during the wedding ceremony."
    },
    {
      id: "5",
      title: "International Forum",
      category: "Official Events",
      url: "https://images.unsplash.com/photo-1540575861501-7c00117fb3c9?auto=format&fit=crop&q=80&w=2070",
      description: "Capturing the gravity and scale of international summits."
    },
    {
      id: "6",
      title: "Graduate Silhouette",
      category: "Convocation",
      url: "https://images.unsplash.com/photo-1541339907198-e08759df913c?auto=format&fit=crop&q=80&w=2070",
      description: "Artistic portraiture of the graduation morning."
    }
  ];

  app.get("/api/photos", (req, res) => {
    res.json(photos);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
