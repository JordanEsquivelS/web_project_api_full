import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onDeleteClick, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleClick = () => {
    onCardClick(card);
  };

  const handleDeleteClick = () => {
    onDeleteClick(card._id);
  };

  function handleLikeClick() {
    onCardLike(card);
  }

  const isLiked =
    card &&
    card.likes &&
    currentUser &&
    card.likes.some((i) => i && i._id === currentUser._id);

  const cardLikeButtonClassName = `photo-grid__like ${
    isLiked ? "photo-grid__like_active" : ""
  }`;

  return (
    <div className="photo-grid" key={card._id}>
      <img
        className="photo-grid__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {((typeof card.owner === "object" &&
        card.owner._id === currentUser._id) ||
        card.owner === currentUser._id) && (
        <img
          alt="imagen de tacho de basura blanco"
          className="photo-grid__delete"
          src={require("../images/delete.svg").default}
          onClick={handleDeleteClick}
        />
      )}
      <div className="photo-grid__description">
        <p className="photo-grid__text">{card.name}</p>
        <div className="photo-grid__likesConteiner">
          <div
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></div>
          <p className="photo-grid__likeCounter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
