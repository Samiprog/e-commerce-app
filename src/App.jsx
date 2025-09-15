import React, { useState } from "react";
import products from "./products";
import Checkout from "./Checkout";

function App() {
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);
  // 🟢 Add to cart
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // 🟢 Increase qty
  const incQty = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );

  // 🟢 Decrease qty
  const decQty = (id) =>
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );

  // 🟢 Remove item
  const removeItem = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  // 🟢 Total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
  <>
    {checkout ? (
      <Checkout cart={cart} total={total} onBack={() => setCheckout(false)} />
    ) : (
      <div className="container mt-4">
        <div className="row">
          {/* Products */}
          <div className="col-lg-8">
            <h2 className="mb-4">Our Products</h2>
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">${product.price}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="col-lg-4">
            <h2 className="mb-4">Cart</h2>

            {cart.length === 0 ? (
              <p className="text-muted">Your cart is empty.</p>
            ) : (
              <ul className="list-group mb-3">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h6 className="my-0">{item.name}</h6>
                      <small className="text-muted">
                        ${item.price} × {item.qty}
                      </small>
                    </div>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => decQty(item.id)}
                      >
                        −
                      </button>
                      <span className="px-2">{item.qty}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => incQty(item.id)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="card p-3">
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <button
                className="btn btn-success mt-3"
                disabled={!cart.length}
                onClick={() => setCheckout(true)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

}

export default App;
