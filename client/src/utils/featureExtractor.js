// src/utils/featureExtractor.js
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

let model = null;

// Base URL for backend proxy
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

// Proxy helper for external URLs
function proxifyUrl(url) {
  if (url.startsWith("http")) {
    return `${API_BASE}/proxy?url=${encodeURIComponent(url)}`;
  }
  return url; // local path or blob
}

// Load MobileNet model once
export async function loadModel() {
  if (!model) {
    model = await mobilenet.load();
  }
  return model;
}

// Compute feature vector for an image (URL or File object)
export async function getFeature(image) {
  await loadModel();

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    if (typeof image === "string") {
      img.src = proxifyUrl(image); // go through proxy if external URL
    } else {
      // File object
      img.src = URL.createObjectURL(image);
    }

    img.onload = () => {
      try {
        const tensor = tf.browser
          .fromPixels(img)
          .resizeNearestNeighbor([224, 224])
          .toFloat()
          .expandDims();
        const features = model.infer(tensor, true); // 1024-dim vector
        resolve(Array.from(features.dataSync()));
        tf.dispose(tensor);
      } catch (err) {
        reject("Error extracting features: " + err.message);
      }
    };

    img.onerror = (e) => reject("Failed to load image: " + e);
  });
}

// Cosine similarity between two vectors
export function cosineSimilarity(vec1, vec2) {
  const dot = vec1.reduce((sum, v, i) => sum + v * vec2[i], 0);
  const mag1 = Math.sqrt(vec1.reduce((sum, v) => sum + v * v, 0));
  const mag2 = Math.sqrt(vec2.reduce((sum, v) => sum + v * v, 0));
  if (mag1 === 0 || mag2 === 0) return 0;
  return dot / (mag1 * mag2);
}