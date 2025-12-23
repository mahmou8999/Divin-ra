import "./cart.css";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const loggedInUser =
    JSON.parse(sessionStorage.getItem("loggedInUser")) || null;
  const customerName = loggedInUser?.name || "Customer";
  const today = new Date().toLocaleDateString("en-GB");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleDelete = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePrint = () => {
    if (!loggedInUser || !loggedInUser.email) {
      Swal.fire({
        icon: "warning",
        title: "Please log in",
        text: "You must log in with your email to print the invoice.",
        confirmButtonText: "OK",
        confirmButtonColor: "#d4af37", 
        background: "black",
        color: "while",
      });
      return;
    }

    window.print(); 
  };

  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price),
    0
  );
  const tax = total * 0.14;
  const totalWithTax = total + tax;

  return (
    <div className="container py-4">
      <div id="print-area">
        <h2 className="text-center mb-4 store-name">Divinéra</h2>

        <div className="mb-3 d-flex justify-content-between">
          <span>
            <strong>Name:</strong> {customerName}
          </span>
          <span>
            <strong>Date:</strong> {today}
          </span>
        </div>

        <h4 className="mb-3">My Cart</h4>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="col print-card d-flex justify-content-evenly"
              style={{
                border: "1px solid goldenrod",
                borderRadius: "8px",
                padding: "10px",
                fontSize: "14px",
                boxShadow: "0 2px 8px rgba(218, 165, 32, 0.3)",
              }}
            >
              <div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="img-fluid mb-2"
                  style={{
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div>
                <h6 className="fw-bold">{item.name}</h6>
                <p className="mb-1">Karat: {item.karat}</p>
                <p className="mb-1">Price: {item.price} EGP</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-sm btn-danger d-print-none"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <hr className="mt-4" />
        <div className="mt-3 text-center">
          <p>
            <strong>Total (excluding tax):</strong> {total.toFixed(2)} EGP
          </p>
          <p>
            <strong>Tax (14%):</strong> {tax.toFixed(2)} EGP
          </p>
          <p className="fw-bold fs-5">
            Total including tax: {totalWithTax.toFixed(2)} EGP
          </p>
        </div>

        <p className="text-center mt-4" style={{ fontSize: "13px" }}>
          This is not an official document but a receipt for the customer to
          schedule an appointment with the branch at the earliest time.
        </p>
      </div>

      <div className="mt-4 d-print-none text-center">
        <button className="btn btn-warning text-dark" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
}

export default Cart;
