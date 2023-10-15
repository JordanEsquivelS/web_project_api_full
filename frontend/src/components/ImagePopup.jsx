import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popImg ${card ? "open" : ""}`}>
      <div className="popImg__container">
        <img
          alt="botón de cerrar"
          className="popImg__close"
          src={require("../images/CloseIcon_blanco.svg").default}
          onClick={onClose}
        />
        <img
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
          className="popImg__bigImage"
        />
        <p className="popImg__text">{card ? card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
