import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";



const Profile = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const userEmail = localStorage.getItem("userEmail");
  const [userName] = useState("Neelakshi");
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || null);
  const [location, setLocation] = useState("");
  const [redeemPoints, setRedeemPoints] = useState(150);
  const [feedback, setFeedback] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [lastOrder, setLastOrder] = useState(
    JSON.parse(localStorage.getItem("lastOrder")) || null
  );

  useEffect(() => {
    if (profilePic) localStorage.setItem("profilePic", profilePic);
  }, [profilePic]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfilePic(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePlaceOrder = () => {
    if (!location.trim()) {
      alert("Please enter your delivery location.");
      return;
    }
    const order = {
      items: cartItems,
      total: discountedPrice,
      location,
      date: new Date().toLocaleString(),
    };
    localStorage.setItem("lastOrder", JSON.stringify(order));
    setLastOrder(order);
    setOrderPlaced(true);
    clearCart();
  };

  const handleRedeem = () => {
    if (redeemPoints >= 100 && !discountApplied) {
      setDiscountApplied(true);
      setRedeemPoints(redeemPoints - 100);
    }
  };
  useEffect(() => {
  const userId = localStorage.getItem("userId");
  const cartItem = JSON.parse(localStorage.getItem("cartItem"));

  if (userId && cartItem) {
    fetch("http://localhost:5000/api/place-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        items: [cartItem]
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Order saved:", data);
        localStorage.removeItem("cartItem");
      })
      .catch((err) => console.error("Order store error:", err));
  }
}, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discountedPrice = discountApplied ? totalPrice * 0.9 : totalPrice;

  const styles = {
    container: {
      padding: "2rem",
      fontFamily: "Segoe UI, sans-serif",
      maxWidth: "950px",
      margin: "auto",
      color: "#333",
    },
    profileTop: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      marginBottom: "2rem",
    },
    profileImage: {
      width: "110px",
      height: "110px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #800000",
    },
    userInfo: {
      lineHeight: "1.5",
    },
    infoBox: {
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      padding: "1rem",
      borderRadius: "10px",
      marginBottom: "1.5rem",
    },
    redeemBox: {
      padding: "1rem",
      backgroundColor: "#fff7e6",
      border: "1px solid #ffc107",
      borderRadius: "10px",
      marginBottom: "1.5rem",
    },
    cartItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
      padding: "1rem",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    },
    cartImage: {
      width: "90px",
      height: "90px",
      borderRadius: "10px",
      objectFit: "cover",
      marginRight: "1rem",
    },
    input: {
      padding: "0.6rem",
      width: "100%",
      borderRadius: "6px",
      border: "1px solid #ccc",
      marginBottom: "1rem",
    },
    button: {
      padding: "0.6rem 1.5rem",
      backgroundColor: "#800000",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    successBox: {
      backgroundColor: "#e6ffed",
      border: "1px solid #28a745",
      padding: "1rem",
      borderRadius: "10px",
      marginTop: "2rem",
    },
    sectionTitle: {
      margin: "1rem 0 0.5rem",
      fontSize: "1.3rem",
      color: "#800000",
    },
  };

  return (
    <div style={styles.container}>
      {/* Profile Info */}
      <div style={styles.profileTop}>
        <img
          src={profilePic || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
          alt="Profile"
          style={styles.profileImage}
        />
        <div style={styles.userInfo}>
          <h2>{userName}</h2>
          <p>{userEmail}</p>
          <input type="file" onChange={handleImageUpload} />
        </div>
      </div>

      {/* Profile Summary */}
      <div style={styles.infoBox}>
        <h3>👤 Profile Summary</h3>
        <p><strong>Name:</strong> {userName}</p>
        <p><strong>Email:</strong> {userEmail}</p>
        <p><strong>Redeem Points:</strong> {redeemPoints}</p>
        <p><strong>Total Items in Cart:</strong> {cartItems.length}</p>
      </div>

      {/* Redeem Points */}
      <div style={styles.redeemBox}>
        <h3>🎁 Redeem & Discounts</h3>
        <p>Points Available: <strong>{redeemPoints}</strong></p>
        <button
          onClick={handleRedeem}
          style={{
            ...styles.button,
            backgroundColor: discountApplied ? "#aaa" : "#28a745",
            marginTop: "0.5rem",
          }}
          disabled={discountApplied || redeemPoints < 100}
        >
          {discountApplied ? "Discount Applied" : "Redeem 100 Points (10% OFF)"}
        </button>
      </div>

      {/* Cart Items */}
      <h3 style={styles.sectionTitle}>🛒 Your Cart</h3>
      {cartItems.length > 0 ? (
        cartItems.map((item, i) => (
          <div key={i} style={styles.cartItem}>
            <img src={item.image} alt={item.name} style={styles.cartImage} />
            <div>
              <h4>{item.name}</h4>
              <p>₹ {item.price}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No items added yet.</p>
      )}

      {/* Address + Order */}
      {!orderPlaced && cartItems.length > 0 && (
        <>
          <h3 style={styles.sectionTitle}>📍 Delivery Address</h3>
          <input
            type="text"
            placeholder="Enter your delivery address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.input}
          />

          <p>
            <strong>Total:</strong> ₹ {discountedPrice.toFixed(2)}{" "}
            {discountApplied && <span style={{ color: "#28a745" }}>(10% off)</span>}
          </p>
          <button onClick={handlePlaceOrder} style={styles.button}>
            Place Order
          </button>
        </>
      )}

      {/* Order Success */}
      {orderPlaced && (
        <div style={styles.successBox}>
          <h3>✅ Order Placed Successfully!</h3>
          <p><strong>Delivered To:</strong> {location}</p>
          <p><strong>Total Paid:</strong> ₹ {discountedPrice.toFixed(2)}</p>
        </div>
      )}
      {/* Feedback Section */}
<h3 style={styles.sectionTitle}>🗣️ Share Your Experience</h3>
<input
  type="text"
  placeholder="Write your experience with food"
  value={feedback}
  onChange={(e) => setFeedback(e.target.value)}
  style={styles.input}
/>
<button
  style={{ ...styles.button, marginTop: "0.5rem" }}
  onClick={() => {
    if (!feedback.trim()) {
      alert("Please write your experience.");
      return;
    }
    localStorage.setItem("foodFeedback", feedback);
    alert("Thanks for your feedback!");
    window.location.href = "/"; // redirect to Home
  }}
>
  Submit Feedback
</button>


      {/* Last Order Details */}
      {lastOrder && (
        <>
          <h3 style={styles.sectionTitle}>📦 Last Order Summary</h3>
          <div style={styles.infoBox}>
            <p><strong>Date:</strong> {lastOrder.date}</p>
            <p><strong>Location:</strong> {lastOrder.location}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {lastOrder.items.map((item, i) => (
                <li key={i}>
                  {item.name} - ₹{item.price}
                </li>
              ))}
            </ul>
            <p><strong>Total Paid:</strong> ₹{lastOrder.total.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
    
  );
};

export default Profile;
