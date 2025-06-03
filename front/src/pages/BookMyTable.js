import React, { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1050&q=80",
];

const BookMyTable = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    people: "",
    table: "",
    seating: "Indoor",
    notes: "",
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your real Razorpay key
      amount: 50000, // ₹500 in paise
      currency: "INR",
      name: "Book My Table",
      description: `Booking for ${formData.name}`,
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: formData.name,
        contact: formData.phone,
      },
      theme: {
        color: "#ff5722",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Save Booking Data First
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        alert("Failed to save booking.");
        return;
      }

      alert("Booking saved! Proceeding to payment...");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Error saving booking.");
      return;
    }

    // 2. Start Razorpay
    await displayRazorpay();

    // 3. Clear form
    setFormData({
      name: "",
      phone: "",
      date: "",
      time: "",
      people: "",
      table: "",
      seating: "Indoor",
      notes: "",
    });
  };

  const styles = {
    wrapper: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundImage: `url(${images[currentImageIndex]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "brightness(0.6)",
      zIndex: -1,
    },
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "1rem",
      boxSizing: "border-box",
    },
    form: {
      backgroundColor: "rgba(0,0,0,0.6)",
      padding: "0px 40px",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "50%",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: "1.2rem",
      boxShadow: "0 0 20px rgba(0,0,0,0.9)",
    },
    input: {
      padding: "12px",
      fontSize: "1rem",
      borderRadius: "8px",
      border: "none",
      outline: "none",
    },
    select: {
      padding: "12px",
      fontSize: "1rem",
      borderRadius: "8px",
      border: "none",
      outline: "none",
      backgroundColor: "#fff",
      color: "#000",
    },
    radioGroup: {
      display: "flex",
      gap: "1.5rem",
      color: "#fff",
      fontSize: "1rem",
    },
    radioLabel: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      cursor: "pointer",
    },
    textarea: {
      padding: "12px",
      fontSize: "1rem",
      borderRadius: "8px",
      border: "none",
      outline: "none",
      resize: "vertical",
    },
    button: {
      padding: "14px",
      fontSize: "1.1rem",
      backgroundColor: "#ff5722",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "background-color 0.3s ease",
    },
    heading: {
      textAlign: "center",
      marginBottom: "1.5rem",
      fontWeight: "700",
      fontSize: "2rem",
    },
  };

  return (
    <>
      <div style={styles.wrapper}></div>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>Book My Table</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="number"
            name="people"
            placeholder="Number of People"
            required
            min="1"
            value={formData.people}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="number"
            name="table"
            placeholder="Table Number"
            required
            min="1"
            value={formData.table}
            onChange={handleChange}
            style={styles.input}
          />

          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="seating"
                value="Indoor"
                checked={formData.seating === "Indoor"}
                onChange={handleChange}
              />
              Indoor
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="seating"
                value="Outdoor"
                checked={formData.seating === "Outdoor"}
                onChange={handleChange}
              />
              Outdoor
            </label>
          </div>

          <textarea
            name="notes"
            placeholder="Additional Notes"
            value={formData.notes}
            onChange={handleChange}
            style={styles.textarea}
            rows={4}
          ></textarea>

          <button type="submit" style={styles.button}>
            Pay & Book
          </button>
        </form>
      </div>
    </>
  );
};

export default BookMyTable;
