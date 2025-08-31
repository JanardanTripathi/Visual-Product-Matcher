import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors());

// Proxy route for images
app.get("/proxy", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(400).json({ error: "Failed to fetch image." });
    }

    const contentType = response.headers.get("content-type");

    // ✅ Ensure it's an image
    if (!contentType || !contentType.startsWith("image/")) {
      return res.status(400).json({ error: "The provided URL is not an image." });
    }

    // ✅ Safer for Render: convert to Buffer instead of piping
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", contentType);
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: "Could not fetch the image." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});