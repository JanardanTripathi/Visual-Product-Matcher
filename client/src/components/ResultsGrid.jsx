function ResultsGrid({ products, loading, total }) {
  // Show skeletons if loading
  const skeletons = Array.from({ length: total || 6 }, (_, i) => i);

  return (
    <div style={styles.grid}>
      {loading
        ? skeletons.map((i) => (
            <div key={i} style={{ ...styles.card, ...styles.skeletonCard }}>
              <div style={styles.skeletonImage}></div>
              <div style={styles.skeletonLine}></div>
              <div style={styles.skeletonLine}></div>
              <div style={styles.skeletonLine}></div>
            </div>
          ))
        : products.map((p) => (
            <div key={p.id} style={styles.card}>
              <img src={p.thumbnail} alt={p.title} style={styles.image} />
              <h3 style={styles.title}>{p.title}</h3>
              <p style={styles.text}>{p.category}</p>
              <p style={styles.text}>${p.price}</p>
              <p style={styles.text}>⭐ {p.rating}</p>
              {"score" in p && (
                <p style={styles.score}>
                  Similarity: {(p.score * 100).toFixed(1)}%
                </p>
              )}
            </div>
          ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "16px",
    marginTop: "20px"
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "12px",
    textAlign: "center",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "6px"
  },
  title: {
    fontSize: "14px",
    margin: "10px 0 5px"
  },
  text: {
    fontSize: "12px",
    margin: "2px 0"
  },
  score: {
    fontSize: "12px",
    marginTop: "6px",
    color: "#007bff",
    fontWeight: "bold"
  },
  // Skeleton styles
  skeletonCard: {
    background: "#f6f6f6",
    animation: "pulse 1.5s infinite"
  },
  skeletonImage: {
    width: "100%",
    height: "150px",
    background: "#ddd",
    borderRadius: "6px",
    marginBottom: "10px"
  },
  skeletonLine: {
    height: "12px",
    background: "#ddd",
    margin: "6px 0",
    borderRadius: "4px"
  }
};

// Add keyframes for skeleton animation globally
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.4; }
    100% { opacity: 1; }
  }`,
  styleSheet.cssRules.length
);

export default ResultsGrid;