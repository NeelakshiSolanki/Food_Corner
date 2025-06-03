import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div style={{
      fontFamily: "'Segoe UI', sans-serif",
      padding: "3rem 1rem",
      background: "linear-gradient(to right, #fdfbfb, #ebedee)",
      minHeight: "100vh"
    }}>
      <h1 style={{ textAlign: "center", fontSize: "3rem", color: "#2d3748", marginBottom: "0.5rem" }}>
        Contact Us
      </h1>
      <p style={{ textAlign: "center", color: "#718096", fontSize: "1.1rem", marginBottom: "2.5rem" }}>
        We'd love to hear from you! Reach out with your questions, feedback, or just to say hi.
      </p>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "center",
        alignItems: "flex-start",
        maxWidth: "1100px",
        margin: "0 auto"
      }}>
        {/* Contact Info */}
        <div style={{
          flex: "1 1 300px",
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ color: "#2d3748", marginBottom: "1.5rem" }}>📍 Contact Information</h2>
          <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem", color: "#4a5568" }}>
            <FaMapMarkerAlt /> 123 Main Street, Delhi, India
          </div>
          <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem", color: "#4a5568" }}>
            <FaPhoneAlt /> +91 98765 43210
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#4a5568" }}>
            <FaEnvelope /> hello@foodcorner.in
          </div>
        </div>

        {/* Contact Form */}
        <div style={{
          flex: "1 1 500px",
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ color: "#2d3748", marginBottom: "1.5rem" }}>✉️ Send Us a Message</h2>
          <form>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ fontWeight: "600", marginBottom: "0.5rem", display: "block", color: "#4a5568" }}>Your Name</label>
              <input type="text" required placeholder="Enter your name"
                style={{
                  width: "100%", padding: "0.75rem", borderRadius: "10px",
                  border: "1px solid #cbd5e0", outline: "none", fontSize: "1rem"
                }} />
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ fontWeight: "600", marginBottom: "0.5rem", display: "block", color: "#4a5568" }}>Email</label>
              <input type="email" required placeholder="Enter your email"
                style={{
                  width: "100%", padding: "0.75rem", borderRadius: "10px",
                  border: "1px solid #cbd5e0", outline: "none", fontSize: "1rem"
                }} />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ fontWeight: "600", marginBottom: "0.5rem", display: "block", color: "#4a5568" }}>Message</label>
              <textarea rows="5" required placeholder="Write your message..."
                style={{
                  width: "100%", padding: "0.75rem", borderRadius: "10px",
                  border: "1px solid #cbd5e0", outline: "none", fontSize: "1rem", resize: "vertical"
                }}></textarea>
            </div>

            <button type="submit"
              style={{
                backgroundColor: "#38a169", color: "white",
                padding: "0.75rem 1.5rem", border: "none",
                borderRadius: "10px", fontSize: "1rem", fontWeight: "600",
                cursor: "pointer", transition: "background-color 0.3s ease"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#2f855a"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#38a169"}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
