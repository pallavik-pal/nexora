import API from "../api";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
   const navigate = useNavigate();
  const handleAdd = async () => {
   try {
     const productId = product.productId; 
     console.log(productId)
    if (!productId) throw new Error("Product ID is missing");

     await API.post("/cart", { productId: productId, qty: 1 });
     console.log("here it is "+productId)
    navigate("/cart"); 
  } catch (err) {
    console.error("Add to cart failed:", err.message);
    alert("Failed to add to cart: " + err.message);
  }
  };

  return (
    <div
      style={{
        border: "1px solid white",   
        padding: "15px",
        width: "250px",               
        textAlign: "center",
        borderRadius: "8px",
        backgroundColor: "black",    
        color: "white",               
        transition: "transform 0.2s, box-shadow 0.2s",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(215, 173, 22, 0.52)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{product.name}</h3>

      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "contain",
          marginBottom: "10px",
        }}
      />

      <p style={{ marginBottom: "15px" }}>₹{product.price}</p>

      <button
        onClick={handleAdd}
        style={{
          padding: "8px 15px",
          cursor: "pointer",
          backgroundColor: "white",
          color: "black",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
