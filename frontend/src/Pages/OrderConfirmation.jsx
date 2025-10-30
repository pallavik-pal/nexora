import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

function OrderConfirmation() {
  const { state } = useLocation();
  const { address, products } = state || {};

  if (!address || !products) return <p>Invalid order data.</p>;

  const totalAmount = products.reduce((sum, p) => sum + p.price * p.qty, 0);
  const timestamp = new Date().toLocaleString();

  const downloadReceipt = () => {
    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
      putOnlyUsedFonts: true,
      compress: true,
    });

    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(20);
    doc.text("Order Receipt", 40, 40);

    doc.setFontSize(11);
    doc.text(`Date/Time: ${timestamp}`, 400, 40);

   
    doc.setFontSize(14);
    doc.text("Shipped To:", 40, 70);
    doc.setFontSize(12);
    let y = 90;
    const addressLines = [
      address.name,
      address.email || "",
      `${address.address1}, ${address.address2}`,
      `${address.city}, ${address.state}, ${address.zip}, ${address.country}`,
      `Phone: ${address.phone}`,
    ];
    addressLines.forEach((line) => {
      doc.text(line, 40, y);
      y += 15;
    });

    
    y += 10;
    doc.setFontSize(14);
    doc.text("Items:", 40, y);
    y += 20;

    doc.setFontSize(12);
    products.forEach((p, i) => {
      const itemLine = `${i + 1}. ${p.title} | Qty: ${p.qty} | ₹${p.price.toFixed(
        2
      )} | Subtotal: ₹${(p.price * p.qty).toFixed(2)}`;
      const wrapped = doc.splitTextToSize(itemLine, 500);
      doc.text(wrapped, 40, y);
      y += wrapped.length * 15;
    });

   
    y += 15;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ₹${totalAmount.toFixed(2)}`, 40, y);

    
    const pageHeight = doc.internal.pageSize.height;
    const centerX = 80;
    const centerY = pageHeight - 60;

    doc.setDrawColor(255, 0, 0);
    doc.setLineWidth(2);
    doc.circle(centerX, centerY, 30, "S");

    doc.setFontSize(14);
    doc.setTextColor(255, 0, 0);
    doc.text("NEXORA", centerX, centerY + 5, { align: "center" });


    doc.save("Order_Receipt.pdf");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "50px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Order Confirmed!</h2>
      <p>Your order has been booked on <strong>{timestamp}</strong> and will be shipped to:</p>

      <div style={{ padding: "20px", border: "1px solid #000", borderRadius: "8px", marginTop: "20px" }}>
        <p><strong>{address.name}</strong></p>
        {address.email && <p>{address.email}</p>}
        <p>{address.address1}, {address.address2}</p>
        <p>{address.city}, {address.state}, {address.zip}, {address.country}</p>
        <p>Phone: {address.phone}</p>
      </div>

      <h3 style={{ marginTop: "30px" }}>Your Items:</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} - Qty: {p.qty} - ₹{p.price} - Subtotal: ₹{p.qty * p.price}
          </li>
        ))}
      </ul>

      <h3>Total Amount: ₹{totalAmount}</h3>

      <button
        onClick={downloadReceipt}
        style={{
          marginTop: "30px",
          padding: "15px 30px",
          backgroundColor: "#0073e6",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Download Receipt
      </button>
    </div>
  );
}

export default OrderConfirmation;
