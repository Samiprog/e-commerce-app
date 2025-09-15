import React, { useState } from "react";

function Checkout({ cart, total, onBack }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    payment: "cod",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order placed:", { ...formData, cart, total });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mt-4">
        <h2>🎉 Order Confirmed!</h2>
        <p>Thank you, {formData.name}. Your order has been placed.</p>
        <button className="btn btn-primary" onClick={onBack}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Payment Method</label>
          <select
            className="form-select"
            name="payment"
            value={formData.payment}
            onChange={handleChange}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit/Debit Card</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          Place Order (${total.toFixed(2)})
        </button>
      </form>
    </div>
  );
}

export default Checkout;
