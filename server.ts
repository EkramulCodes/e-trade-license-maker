import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("licenses.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS licenses (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.post("/api/licenses", (req, res) => {
    const { id, data } = req.body;
    try {
      const stmt = db.prepare("INSERT OR REPLACE INTO licenses (id, data) VALUES (?, ?)");
      stmt.run(id, JSON.stringify(data));
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save license" });
    }
  });

  app.get("/api/licenses/:id", (req, res) => {
    const { id } = req.params;
    try {
      const stmt = db.prepare("SELECT data FROM licenses WHERE id = ?");
      const row = stmt.get(id) as { data: string } | undefined;
      if (row) {
        res.json(JSON.parse(row.data));
      } else {
        res.status(404).json({ error: "License not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch license" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
