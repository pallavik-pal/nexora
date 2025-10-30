import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
    },
    {
      name: "Clothing",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Shoes",
      image:
        "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    },
    {
      name: "Accessories",
      image:
        "https://plus.unsplash.com/premium_photo-1681276170683-706111cf496e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFzaGlvbiUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    },
  ];

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f0f4f8, #d9e2ec, #ffffff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
    
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
          padding: "60px 0",
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(`/category/${cat.name.toLowerCase()}`)}
            style={{
              width: "260px",
              height: "320px",
              border: "2px solid black",
              borderRadius: "15px",
              overflow: "hidden",
              cursor: "pointer",
              backgroundColor: "white",
              color: "black",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              style={{
                width: "100%",
                height: "75%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                height: "25%",
                backgroundColor: "black",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                fontWeight: "bold",
                letterSpacing: "0.5px",
              }}
            >
              {cat.name}
            </div>
          </div>
        ))}
      </div>

     
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
          paddingBottom: "60px",
        }}
      >
        {loading ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <ProductCard key={products.productId} product={product} />
         
          ))
        )}
      </div>

     
      <footer
        style={{
          backgroundColor: "#111",
          color: "white",
          width: "100%",
          padding: "10px 20px",
          borderTop: "2px solid #222",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ flex: "1", minWidth: "200px", margin: "10px" }}>
            <h3 style={{ marginBottom: "10px" }}>About</h3>
            <p>
              Nexora E-Commerce is your one-stop shop for electronics, clothing, shoes, and accessories.
            </p>
          </div>

          <div style={{ flex: "1", minWidth: "200px", margin: "10px" }}>
            <h3 style={{ marginBottom: "10px" }}>Customer Service</h3>
            <p>FAQs</p>
            <p>Shipping & Returns</p>
            <p>Order Tracking</p>
          </div>

          <div style={{ flex: "1", minWidth: "200px", margin: "10px" }}>
            <h3 style={{ marginBottom: "10px" }}>Contact</h3>
            <p>Email: support@nexora.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Commerce St, City, Country</p>
          </div>

          <div style={{ flex: "1", minWidth: "200px", margin: "10px" }}>
            <h3 style={{ marginBottom: "10px" }}>Follow Us</h3>
            <p>Facebook | Instagram | Twitter | LinkedIn</p>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            fontSize: "0.9rem",
          }}
        >
          © {new Date().getFullYear()} Nexora E-Commerce | All Rights Reserved
        </div>
      </footer>
    </div>
  );
}

export default ProductsPage;
