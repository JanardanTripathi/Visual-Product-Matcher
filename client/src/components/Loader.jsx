function Loader() {
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <div className="spinner"></div>
      <p style={{ color: "#555", marginTop: "10px" }}>Finding similar products...</p>
    </div>
  );
}

export default Loader;