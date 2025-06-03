import React from "react";

const FoodCard = ({ item }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "8px",
      width: "200px",
    }}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>₹{item.price}</p>
    </div>
  );
};

export default FoodCard;
