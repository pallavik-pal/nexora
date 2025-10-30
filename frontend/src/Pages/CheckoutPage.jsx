import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api"; 

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemsFromState = location.state?.cartItems || [];
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [form, setForm] = useState({
    country: "India",
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productPromises = cartItemsFromState.map(async (item) => {
          const id = item.productId || item.product?._id;
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          if (!res.ok) throw new Error(`Product ${id} not found`);
          const data = await res.json();
          return { ...data, qty: item.qty || 1 };
        });
        const productData = await Promise.all(productPromises);
        setProducts(productData);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    if (cartItemsFromState.length > 0) fetchProducts();
    else setLoadingProducts(false);
  }, [cartItemsFromState]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddAddress = (e) => {
    e.preventDefault();
    const newAddress = { ...form, id: Date.now() };
    setAddresses([...addresses, newAddress]);
    setSelectedAddress(newAddress.id);
    setForm({
      country: "India",
      name: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    });
    setShowModal(false);
  };

 
  const handleProceed = () => {
    if (!selectedAddress) {
      alert("Please select an address before proceeding!");
      return;
    }
    const address = addresses.find((addr) => addr.id === selectedAddress);
    navigate("/order-confirmation", { state: { address, products } });
  };

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", fontFamily: "Arial, sans-serif", textAlign: "left" }}>
      <h2>Deliver Here</h2>

      
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
        {addresses.map((addr) => (
          <div
            key={addr.id}
            onClick={() => setSelectedAddress(addr.id)}
            style={{
              border: selectedAddress === addr.id ? "2px solid #0073e6" : "1px solid #000",
              borderRadius: "8px",
              padding: "15px",
              cursor: "pointer",
              background: "#000",
              color: "#fff",
            }}
          >
            <p><strong>{addr.name}</strong></p>
            {addr.email && <p>{addr.email}</p>}
            <p>{addr.address1}, {addr.address2}</p>
            <p>{addr.city}, {addr.state}, {addr.zip}, {addr.country}</p>
            <p>Phone: {addr.phone}</p>
          </div>
        ))}
      </div>

      
      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: "12px 20px",
          backgroundColor: "#0073e6",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginBottom: "30px",
        }}
      >
        + Add Address
      </button>

     
      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Enter New Address</h2>
            <form onSubmit={handleAddAddress} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <select name="country" value={form.country} onChange={handleChange} style={inputStyle}>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
                <option>Other</option>
              </select>
              <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required style={inputStyle} />
              <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={inputStyle} />
              <input name="phone" type="tel" placeholder="Mobile Number" value={form.phone} onChange={handleChange} required style={inputStyle} />
              <input name="address1" placeholder="Address Line 1" value={form.address1} onChange={handleChange} required style={inputStyle} />
              <input name="address2" placeholder="Address Line 2" value={form.address2} onChange={handleChange} style={inputStyle} />
              <input name="city" placeholder="City" value={form.city} onChange={handleChange} required style={inputStyle} />
              <input name="state" placeholder="State" value={form.state} onChange={handleChange} required style={inputStyle} />
              <input name="zip" placeholder="Pincode" value={form.zip} onChange={handleChange} required style={inputStyle} />
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="submit" style={saveBtnStyle}>Save Address</button>
                <button type="button" onClick={() => setShowModal(false)} style={cancelBtnStyle}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    
      <h2>Your Items to be packed</h2>
      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {loadingProducts ? (
          <p>Loading cart items...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid white",
                padding: "15px",
                width: "250px",
                textAlign: "center",
                borderRadius: "8px",
                backgroundColor: "black",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>{product.title}</h3>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "100%", height: "150px", objectFit: "contain", marginBottom: "10px" }}
              />
              <p>Qty: {product.qty}</p>
              <p>Price: ₹{product.price}</p>
            </div>
          ))
        ) : (
          <p>No items in cart.</p>
        )}
      </div>

      
      <button
        onClick={handleProceed}
        style={{
          marginTop: "30px",
          padding: "15px 30px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Proceed
      </button>
    </div>
  );
}


const overlayStyle = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" };
const modalStyle = { background: "#fff", padding: "30px", borderRadius: "10px", width: "600px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" };
const inputStyle = { padding: "15px", borderRadius: "5px", border: "1px solid #000", backgroundColor: "#fff", color: "#000", width: "100%", fontSize: "16px" };
const saveBtnStyle = { flex: 1, padding: "15px", backgroundColor: "#0073e6", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" };
const cancelBtnStyle = { flex: 1, padding: "15px", backgroundColor: "#ccc", color: "#000", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" };

export default CheckoutPage;
