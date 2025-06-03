import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";  // Import this
import axios from "axios";
import "./Menu.css";

const Menu = () => {
  const [activeType, setActiveType] = useState("veg");
  const [mealTime, setMealTime] = useState("breakfast");
  const [dishes, setDishes] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dishes", {
          params: { type: activeType, mealTime: mealTime },
        });
        setDishes(res.data);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
        setDishes([]); // Clear dishes on error
      }
    };

    fetchDishes();
  }, [activeType, mealTime]);

  const handleAddToCart = (dish) => {
    addToCart(dish);
    navigate("/profile");  // Redirect to Profile page after adding
  };

  return (
    <div className="menu-container">
      <h2>Choose Type</h2>
      <div className="button-group">
        {["veg", "nonVeg"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`menu-button ${activeType === type ? "active" : ""}`}
          >
            {type === "veg" ? "Veg" : "Non-Veg"}
          </button>
        ))}
      </div>

      <h2>Select Meal</h2>
      <div className="button-group">
        {["breakfast", "lunch", "dinner"].map((meal) => (
          <button
            key={meal}
            onClick={() => setMealTime(meal)}
            className={`menu-button ${mealTime === meal ? "active" : ""}`}
          >
            {meal.charAt(0).toUpperCase() + meal.slice(1)}
          </button>
        ))}
      </div>

      <h2>Our Specialties</h2>
      <div className="dish-cards-container">
        {dishes.length > 0 ? (
          dishes.map((dish, index) => (
            <div className="dish-card" key={index}>
              <img src={dish.image} alt={dish.name} className="dish-image" />
              <div className="dish-info">
                <h3 className="dish-name">{dish.name}</h3>
                <p className="dish-description">{dish.description}</p>
                <p className="dish-price">₹ {dish.price}</p>
                <button
                  onClick={() => handleAddToCart(dish)}  
                  className="add-to-cart-button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading dishes...</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
