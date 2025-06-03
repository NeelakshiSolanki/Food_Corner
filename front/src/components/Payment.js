import React, { useState } from "react";

const DummyPayment = () => {
  const [status, setStatus] = useState(null);

  const handlePayment = async () => {
    setStatus("processing");

    // Simulate payment processing delay
    setTimeout(async () => {
      // Simulate always success
      setStatus("success");

      // Dummy payment data to send to backend
      const paymentData = {
        paymentId: "dummy123", // You can generate unique ID if you want
        amount: 500,           // For example, table payment amount
        status: "success",
      };

      try {
        const res = await fetch("http://localhost:5000/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        });

        const data = await res.json();

        if (res.ok) {
          alert("Payment Verified Successfully: " + data.message);
        } else {
          alert("Payment Verification Failed: " + data.message);
          setStatus("failure");
        }
      } catch (error) {
        alert("Error verifying payment");
        setStatus("failure");
      }
    }, 2000);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        textAlign: "center",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      <h2>Dummy Payment Simulation</h2>
      {status === "processing" && <p>Processing payment...</p>}
      {status === "success" && <p style={{ color: "green" }}>Payment Successful! 🎉</p>}
      {status === "failure" && <p style={{ color: "red" }}>Payment Failed. Please try again.</p>}
      {!status && <p>Click the button below to simulate a payment.</p>}

      <button
        onClick={handlePayment}
        disabled={status === "processing"}
        style={{
          padding: "12px 24px",
          fontSize: "1rem",
          cursor: status === "processing" ? "not-allowed" : "pointer",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          marginTop: 20,
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default DummyPayment;
