import React, { useState } from "react";

function UploadArea({ onImageSelected, onUrlEntered }) {
  const [url, setUrl] = useState("");

  // Handle local file selection
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onImageSelected(file); // pass File object
    reader.readAsDataURL(file);
  };

  // Handle URL submission
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (url.trim() && onUrlEntered) {
      onUrlEntered(url.trim());
      setUrl("");
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={{ marginBottom: "15px" }}>Upload an image or provide URL</h3>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={styles.fileInput}
      />

      <form onSubmit={handleUrlSubmit} style={styles.urlForm}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste image URL"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Upload URL
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    maxWidth: "400px",
    width: "90%",
    margin: "20px auto",
  },
  fileInput: {
    marginBottom: "10px",
  },
  urlForm: {
    display: "flex",
    gap: "8px",
    width: "100%",
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
};

export default UploadArea;