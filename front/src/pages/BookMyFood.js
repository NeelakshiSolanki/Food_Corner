import React, { useState } from "react";

const dishesList = [
  { id: 1, name: "Paneer Butter Masala", price: 250 },
  { id: 2, name: "Chicken Biryani", price: 320 },
  { id: 3, name: "Veg Fried Rice", price: 180 },
  { id: 4, name: "Butter Naan", price: 40 },
  { id: 5, name: "Gulab Jamun", price: 60 },
];

const BookMyFood = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    dishId: "",
    instructions: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDish = dishesList.find(d => d.id === parseInt(formData.dishId));
    alert(`Booking Confirmed!\n
Name: ${formData.name}
Phone: ${formData.phone}
Date: ${formData.date}
Time: ${formData.time}
Dish: ${selectedDish ? selectedDish.name : "None"}
Instructions: ${formData.instructions}
`);
    setFormData({ name: "", phone: "", date: "", time: "", dishId: "", instructions: "" });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🍽️ Book My Food</h1>

        <form onSubmit={handleSubmit} style={styles.form}>

          <label style={styles.label}>Full Name</label>
          <input
            style={styles.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
          />

          <label style={styles.label}>Phone Number</label>
          <input
            style={styles.input}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            required
          />

          <div style={styles.row}>
            <div style={styles.halfInput}>
              <label style={styles.label}>Booking Date</label>
              <input
                style={styles.input}
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.halfInput}>
              <label style={styles.label}>Booking Time</label>
              <input
                style={styles.input}
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label style={styles.label}>Select Dish</label>
          <select
            style={styles.select}
            name="dishId"
            value={formData.dishId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              -- Choose a Dish --
            </option>
            {dishesList.map(dish => (
              <option key={dish.id} value={dish.id}>
                {dish.name} - ₹{dish.price}
              </option>
            ))}
          </select>

          <label style={styles.label}>Special Instructions</label>
          <textarea
            style={styles.textarea}
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Anything else we should know?"
            rows="4"
          />

          <button type="submit" style={styles.button}>
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    background: "white",
    padding: "2.5rem 3rem",
    borderRadius: "20px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#357ABD",
    fontWeight: "700",
    fontSize: "2.2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#555",
  },
  input: {
    padding: "0.7rem 1rem",
    marginBottom: "1.5rem",
    borderRadius: "12px",
    border: "1.8px solid #ddd",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  row: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  halfInput: {
    flex: 1,
  },
  select: {
    padding: "0.7rem 1rem",
    marginBottom: "1.5rem",
    borderRadius: "12px",
    border: "1.8px solid #ddd",
    fontSize: "1rem",
    outline: "none",
    cursor: "pointer",
    backgroundColor: "white",
  },
  textarea: {
    padding: "1rem",
    marginBottom: "1.5rem",
    borderRadius: "12px",
    border: "1.8px solid #ddd",
    fontSize: "1rem",
    resize: "vertical",
    outline: "none",
  },
  button: {
    padding: "1rem",
    backgroundColor: "#357ABD",
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontWeight: "700",
    fontSize: "1.2rem",
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(53, 122, 189, 0.35)",
    transition: "background-color 0.3s ease",
  },
};

export default BookMyFood;
