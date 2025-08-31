import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

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

    let contentType = response.headers.get("content-type");

    // If missing, try to guess by extension
    if (!contentType) {
      if (url.match(/\.(jpg|jpeg)$/i)) contentType = "image/jpeg";
      else if (url.match(/\.png$/i)) contentType = "image/png";
      else if (url.match(/\.gif$/i)) contentType = "image/gif";
      else if (url.match(/\.webp$/i)) contentType = "image/webp";
    }

    // Reject if still not an image
    if (!contentType || !contentType.startsWith("image/")) {
      return res.status(400).json({ error: "The provided URL is not an image." });
    }

    // Forward content type
    res.setHeader("Content-Type", contentType);

    // Pipe the image data directly to the response
    response.body.pipe(res);

  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: "Could not fetch the image." });
  }
});

// Health check route
app.get("/", (req, res) => {
  res.send("✅ Visual Product Matcher Proxy is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
