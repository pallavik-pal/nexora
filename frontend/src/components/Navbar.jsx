import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query); 
    }
  };

  return (
    <nav className="navbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px" }}>
      <h2 style={{ margin: 0,paddingLeft:"10px" }}> Vibe Commerce</h2>

      <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "12px 250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "black",
            backgroundColor:"whitesmoke",
            outline: "none",
            width: "200px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "6px 12px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#d7ad16",
            color: "black",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/checkout">Checkout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
