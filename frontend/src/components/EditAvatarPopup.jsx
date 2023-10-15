import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (avatarInputRef.current) {
      onUpdateAvatar({
        avatar: avatarInputRef.current.value,
      });
    }
  };

  return (
    <PopupWithForm
      title="Cambiar foto de perfil"
      name="imgProfile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarInputRef}
        className="popup__input form__input"
        type="url"
        id="input-urlImg"
        placeholder="Enlace a la Imagen de perfil"
        required
      />
      <span className="popup__error" id="input-urlImg-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
