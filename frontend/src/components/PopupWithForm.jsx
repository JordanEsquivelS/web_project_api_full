import React from "react";

function PopupWithForm({
  isOpen,
  title,
  children,
  formType,
  onClose,
  name,
  onSubmit,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <img
          className="popup__container-image"
          src={require("../images/CloseIcon_blanco.svg").default}
          alt="botón de cerrar"
          onClick={onClose}
        />
        <form className="popup__form form" onSubmit={onSubmit} noValidate>
          <h2 className="form__title">{title}</h2>

          {isOpen && children}

          {formType !== "¿Estás seguro?" && (
            <button
              className="popup__button form__save"
              type="submit"
              id={`submit_${name}`}
            >
              GUARDAR
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
