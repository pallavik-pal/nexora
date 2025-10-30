import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const res = await API.get("/cart");
      const cartData = res.data.cart || [];
      setCart(cartData);
      setTotal(res.data.total ? res.data.total.toFixed(2) : 0);
    } catch (err) {
      console.error("Failed to load cart:", err);
      alert("Failed to load cart");
      setCart([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      loadCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove item");
    }
  };


  const updateQty = async (id, newQty) => {
    if (newQty < 1) return; 
    try {
      await API.patch(`/cart/${id}`, { qty: newQty });
      loadCart();
    } catch (err) {
      console.error("Failed to update quantity:", err);
      alert("Failed to update quantity");
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading cart...</p>;

  return (
    <div style={{ width: "100%", padding: "20px", boxSizing: "border-box" }}>
      <h2 style={{ marginBottom: "20px" }}> Cart Items</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                gap: "15px",
                padding: "15px",
                backgroundColor: "white",
                color: "black",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                alignItems: "center",
              }}
            >
              {item.product ? (
                <>
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px" }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0 }}>{item.product.title}</h3>
                    <h5 style={{ margin: 0 }}>{item.product.description}</h5>
                    <p style={{ margin: "5px 0" }}>Price: ₹{item.product.price}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <button
                        onClick={() => updateQty(item._id, item.qty - 1)}
                        style={{
                          padding: "5px 10px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          cursor: "pointer",
                        }}
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item._id, item.qty + 1)}
                        style={{
                          padding: "5px 10px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <p>Product info not available</p>
                  <p>Quantity: {item.qty}</p>
                </div>
              )}

              <button
                onClick={() => removeItem(item._id)}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#600505ff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h2 style={{ marginTop: "20px" }}>Total: ₹{total}</h2>

          <button
            onClick={() =>
              navigate("/checkout", { state: { cartItems: cart.map((c) => ({ productId: c.productId, qty: c.qty })) } })
            }
            style={{
              marginTop: "10px",
              padding: "12px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              width: "200px",
              alignSelf: "flex-end",
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
