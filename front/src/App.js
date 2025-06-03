import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CombinedLoginRegister from "./pages/Login";
import BookMyFood from "./pages/BookMyFood";
import BookMyTable from "./pages/BookMyTable";
import Profile from "./pages/Profile"; 

import { CartProvider } from "./context/CartContext";

function App() {
  const [userEmail, setUserEmail] = useState("");

  // On page load, check localStorage for user
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setUserEmail(email);
  }, []);

 return (
  <CartProvider>
    <Router>
      <Navbar userEmail={userEmail} setUserEmail={setUserEmail} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/auth"
          element={<CombinedLoginRegister setUserEmail={setUserEmail} />}
        />
        <Route path="/bookmyfood" element={<BookMyFood />} />
        <Route path="/book-table" element={<BookMyTable />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </Router>
  </CartProvider>
);
}

export default App;
