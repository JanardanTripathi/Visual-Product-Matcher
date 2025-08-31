import React, { useState } from "react";

function UploadArea({ onImageSelected, onUrlEntered }) {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState(null);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Invalid file type. Please upload an image (JPG, PNG, WEBP).");
      return;
    }

    onImageSelected(file);
    setUrlError(null);
  };

  // Handle URL submission
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!url.trim() || !/^https?:\/\//i.test(url.trim())) {
      setUrlError("Invalid URL. Please enter a valid image link.");
      return;
    }

    onUrlEntered(url.trim());
    setUrl("");
    setUrlError(null);
  };

  return (
    <div style={styles.container}>
      <h3 style={{ marginBottom: "15px" }}>Upload an image or enter a URL</h3>

      {/* File Upload Section */}
      <div style={styles.section}>
        <label style={styles.label}>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={styles.fileInput}
        />
        <p style={styles.hint}>Supported formats: JPG, PNG, WEBP</p>
      </div>

      {/* URL Input Section */}
      <div style={styles.section}>
        <label style={styles.label}>Image URL</label>
        <form onSubmit={handleUrlSubmit} style={styles.urlForm}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste image URL here"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
        {urlError && <p style={styles.error}>{urlError}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    margin: "20px auto",
    maxWidth: "450px",
  },
  section: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
  fileInput: {
    padding: "6px",
  },
  hint: {
    fontSize: "12px",
    color: "#666",
    marginTop: "4px",
  },
  urlForm: {
    display: "flex",
    gap: "8px",
    flexDirection: "row",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginTop: "5px",
  },
};

export default UploadArea;
