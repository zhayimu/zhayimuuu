import express from "express";
import helmet from "helmet";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.disable("x-powered-by");

  // Add Security headers using Helmet
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            // Vite requires unsafe-inline and unsafe-eval in development
            ...(process.env.NODE_ENV !== "production" ? ["'unsafe-inline'", "'unsafe-eval'"] : []),
          ],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: [
            "'self'",
            "data:",
            "blob:",
            "https://images.unsplash.com",
            "https://i.ibb.co",
            "https://*.ibb.co"
          ],
          connectSrc: ["'self'", "ws:", "wss:", "https://vitals.vercel-insights.com"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          // Allow framing in AI Studio for preview purposes
          frameAncestors: ["'self'", "https://aistudio.google.com", "https://*.google.com"],
        },
      },
      frameguard: {
        action: "sameorigin",
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      xssFilter: true, // Adds X-XSS-Protection
      noSniff: true, // Adds X-Content-Type-Options
      referrerPolicy: {
        policy: "strict-origin-when-cross-origin",
      },
      crossOriginResourcePolicy: {
        policy: "same-origin", // or cross-origin depending on needs, but using helmet defaults or specific
      },
    })
  );

  // Set Permissions-Policy manually as helmet doesn't have a dedicated API for all features
  app.use((req, res, next) => {
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
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
