// Card.tsx
import "./Card.css";
import React from "react";

interface CardProps {
  title: string;
  date: string;
  imageUrl: string;
  explanation: string;
}

const Card: React.FC<CardProps> = ({ title, date, imageUrl, explanation }) => {
  return (
    <div className="card">
      <h2 className="card__title">
        {title} ({date})
      </h2>
      <img
        className="card__image"
        src={imageUrl}
        alt={title}
        style={{ maxWidth: "100%" }}
      />
      <p className="card__explanation">{explanation}</p>
    </div>
  );
};

export default Card;
