import { useState } from "react";
import API from "../api";

function CartItem({ item, onRemove, onUpdate }) {
  const [qty, setQty] = useState(item.qty);
  const [updating, setUpdating] = useState(false);

  const handleQtyChange = async (delta) => {
    const newQty = qty + delta;
    if (newQty < 1) return; 

    try {
      setUpdating(true);
      await API.patch(`/cart/${item._id}`, { qty: newQty });
      setQty(newQty);
      if (onUpdate) onUpdate();l
    } catch (err) {
      console.error("Failed to update quantity:", err);
      alert("Failed to update quantity");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        background: "white",
        color: "black",
        padding: "10px",
        borderRadius: "5px",
        alignItems: "center",
      }}
    >
      {item.product ? (
        <>
          <img
            src={item.product.image}
            alt={item.product.title}
            style={{ width: "80px", objectFit: "contain" }}
          />
          <div style={{ flex: 1 }}>
            <h3>{item.product.title}</h3>
            <p>Price: ₹{item.product.price}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
              <button
                onClick={() => handleQtyChange(-1)}
                disabled={updating || qty === 1}
              >
                –
              </button>
              <span>{qty}</span>
              <button onClick={() => handleQtyChange(1)} disabled={updating}>
                +
              </button>
            </div>
          </div>
          <button onClick={() => onRemove(item._id)} disabled={updating}>
            Remove
          </button>
        </>
      ) : (
        <p>Product info not available</p>
      )}
    </div>
  );
}

export default CartItem;
