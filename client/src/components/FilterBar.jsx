import { useState } from "react";

function FilterBar({ onThresholdChange }) {
  const [threshold, setThreshold] = useState(0.0);

  const handleChange = (e) => {
    const value = parseFloat(e.target.value);
    setThreshold(value);
    onThresholdChange(value);
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>
        Similarity Threshold: {threshold.toFixed(2)}
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={threshold}
        onChange={handleChange}
        style={styles.slider}
      />
    </div>
  );
}

const styles = {
  container: {
    margin: "20px 0",
    textAlign: "center"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px"
  },
  slider: {
    width: "80%"
  }
};

export default FilterBar;