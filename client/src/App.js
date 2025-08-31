import { useEffect, useState } from "react";
import UploadArea from "./components/UploadArea";
import ResultsGrid from "./components/ResultsGrid";
import { getFeature, cosineSimilarity } from "./utils/featureExtractor";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [queryImage, setQueryImage] = useState(null);
  const [matched, setMatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minScore, setMinScore] = useState(0.0);
  const [error, setError] = useState(null);

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

  // Load products from JSON
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("/products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        const initialized = data.map((p) => ({ ...p, feature: p.feature || [] }));
        setProducts(initialized);
      })
      .catch((err) => {
        console.error("Product load error:", err);
        setError("Error loading products. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Compute matches whenever query image changes
  useEffect(() => {
    if (!queryImage || products.length === 0) return;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        // Compute feature for query image
        const queryVec = await getFeature(queryImage);

        // Compute feature for products if not already done
        const updatedProducts = await Promise.all(
          products.map(async (p) => {
            if (!p.feature || p.feature.length === 0) {
              try {
                const feature = await getFeature(p.thumbnail);
                return { ...p, feature };
              } catch (err) {
                console.warn("Feature extraction failed for product:", p.id);
                return { ...p, feature: [] };
              }
            }
            return p;
          })
        );

        setProducts(updatedProducts);

        // Compute similarity scores
        const results = updatedProducts.map((p) => ({
          ...p,
          score: p.feature.length ? cosineSimilarity(queryVec, p.feature) : 0,
        }));

        setMatched(results.sort((a, b) => b.score - a.score));
      } catch (err) {
        console.error("Matching error:", err);
        setError("Could not process the selected image. Make sure the URL is valid or file is correct.");
      } finally {
        setLoading(false);
      }
    })();
  }, [queryImage, products]);

  // Handle file upload
  const handleFileUpload = (file) => {
    if (!file.type.startsWith("image/")) {
      setError("Invalid file type. Please upload an image (JPG, PNG, WEBP).");
      return;
    }
    setError(null);
    setQueryImage(URL.createObjectURL(file));
  };

  // Handle URL input
  const handleUrlInput = (url) => {
    if (!url || !/^https?:\/\//i.test(url)) {
      setError("Invalid URL. Please enter a valid image link.");
      return;
    }
    setError(null);
    // Route URL through backend proxy
    const proxiedUrl = `${API_BASE}/proxy?url=${encodeURIComponent(url.trim())}`;
    setQueryImage(proxiedUrl);
  };

  // Decide what to display
  const results = queryImage
    ? matched.filter((p) => p.score >= minScore).slice(0, 6)
    : products.slice(0, 54);

  return (
    <div className="container">
      <h1>Visual Product Matcher</h1>

      <UploadArea
        onImageSelected={handleFileUpload}
        onUrlEntered={handleUrlInput}
      />

      {queryImage && (
        <div className="selected-image">
          <h3>Selected Image</h3>
          <img src={queryImage} alt="Query" />
        </div>
      )}

      {queryImage && (
        <div className="filter-bar">
          <label>
            Similarity: {Math.round(minScore * 100)}%
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={minScore}
              onChange={(e) => setMinScore(parseFloat(e.target.value))}
            />
          </label>
        </div>
      )}

      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>{queryImage ? "Computing matches..." : "Loading images..."}</p>
        </div>
      )}

      {error && !loading && <p className="error-message">{error}</p>}

      {!error && (
        <>
          <h2>{queryImage ? "Matched Products" : "All Products"}</h2>
          <ResultsGrid products={results} />
        </>
      )}

      {queryImage && results.length === 0 && !loading && !error && (
        <p className="empty-message">No similar products found</p>
      )}
    </div>
  );
}

export default App;