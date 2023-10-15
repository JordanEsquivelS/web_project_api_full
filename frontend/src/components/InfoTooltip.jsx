import React from "react";

function InfoTooltip({ isSuccess, isOpen, onClose, message }) {
  return (
    <div className={`info-tooltip ${isOpen ? "info-tooltip_opened" : ""}`}>
      <div className="info-tooltip__wrapper">
        <img
          onClick={onClose}
          className="info-tooltip__close"
          src={require("../images/CloseIcon_blanco.svg").default}
          alt="botón de cerrar"
        />
        <div className="info-tooltip__content">
          <img
            className="info-tooltip__image"
            src={
              require(isSuccess
                ? "../images/check-info.svg"
                : "../images/error-info.svg").default
            }
            alt={isSuccess ? "Correcto" : "Error"}
          />
          <p className="info-tooltip__message">
            {isSuccess ? "¡Correcto! Ya estás registrado." : message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
