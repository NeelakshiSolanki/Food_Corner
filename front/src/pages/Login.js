import React, { useState } from "react";
import axios from "axios";

const CombinedLoginRegister = ({ setUserEmail }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [popup, setPopup] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const dataToSend = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(url, dataToSend);
      setPopup(res.data.message);
      setFormData({ name: "", email: "", password: "" });

      if (isLogin && setUserEmail) {
        localStorage.setItem("userEmail", dataToSend.email);
        setUserEmail(dataToSend.email);
      }

      setTimeout(() => setPopup(""), 3000);
    } catch (err) {
      setPopup("Something went wrong! " + (err.response?.data?.message || ""));
      setTimeout(() => setPopup(""), 3000);
    }
  };

  return (
    <>
      <style>{`
        .auth-container {
          max-width: 400px;
          margin: 3rem auto;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 0 15px rgba(128, 0, 0, 0.2);
          background: #fff;
          font-family: "Segoe UI", sans-serif;
        }
        .auth-heading {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #b30000;
          font-size: 28px;
        }
        .auth-input {
          width: 100%;
          padding: 0.7rem;
          margin: 0.5rem 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
        }
        .auth-button {
          width: 100%;
          padding: 0.8rem;
          background-color: #b30000;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 1rem;
          font-size: 16px;
        }
        .auth-button:hover {
          background-color: #990000;
        }
        .auth-toggle {
          margin-top: 1rem;
          text-align: center;
          color: #b30000;
          cursor: pointer;
          text-decoration: underline;
          font-weight: bold;
        }
        .auth-popup {
          background-color: #ffdede;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          margin-top: 1rem;
          color: #800000;
          font-weight: bold;
          border: 1px solid #b30000;
        }
      `}</style>

      <div className="auth-container">
        <h2 className="auth-heading">{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="auth-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-button">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div
          className="auth-toggle"
          onClick={() => {
            setIsLogin(!isLogin);
            setPopup("");
          }}
        >
          {isLogin ? "New user? Register here" : "Already registered? Login here"}
        </div>
        {popup && <div className="auth-popup">{popup}</div>}
      </div>
    </>
  );
};

export default CombinedLoginRegister;
