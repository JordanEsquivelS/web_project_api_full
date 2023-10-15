import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Edit profile"
      name="edit"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input form__name"
        type="text"
        id="name"
        minLength="2"
        maxLength="40"
        placeholder="Nombre"
        value={name}
        onChange={handleNameChange}
        required
      />
      <span className="popup__error" id="name-error"></span>

      <input
        className="popup__input form__input"
        type="text"
        id="aboutMe"
        minLength="2"
        maxLength="200"
        placeholder="Acerca de mi"
        value={description}
        onChange={handleDescriptionChange}
        required
      />
      <span className="popup__error" id="aboutMe-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
