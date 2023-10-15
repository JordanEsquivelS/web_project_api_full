import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import Card from "./Card";
import ImagePopup from "./ImagePopup";

function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <>
        <div className="profile">
          <div className="profile__conteinerImg">
            <img
              className="profile__image"
              id="profileImage"
              src={currentUser?.avatar}
              alt="Avatar del estudiante de programación web de Practicum"
            />
            <button
              onClick={props.onEditAvatarClick}
              className="profile__overlayImg"
            >
              <img
                className="profile__editImg"
                src={require("../images/edit_img_profile.svg").default}
                alt="lápiz de edición de foto perfil"
              />
            </button>
          </div>

          <div className="profile-info">
            <h1 className="profile-info__nombre">{currentUser?.name}</h1>
            <h2 className="profile-info__about-me">{currentUser?.about}</h2>
            <button
              onClick={props.onEditProfileClick}
              className="profile-info__edit"
            >
              <img
                src={require("../images/Edit_Button.svg").default}
                alt="botón de editar"
              />
            </button>
          </div>
          <button onClick={props.onAddPlaceClick} className="profile__addPlace">
            <img
              className="profile__add-image"
              src={require("../images/adicion.svg").default}
              alt="botón de agregado"
            />
          </button>
        </div>
      </>

      <>
        <div className="grid-container" id="grid-container">
          {props.cards &&
            props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardLike={props.onCardLike}
                onDeleteClick={props.onDeleteClick}
                onCardClick={props.onCardClick}
              />
            ))}
        </div>
      </>

      <PopupWithForm
        title="¿Estás seguro?"
        formType="¿Estás seguro?"
        name="deleteCard"
        isOpen={props.isDeleteForm}
        onClose={props.onClosePopups}
      >
        <button
          className="popup__button form__save"
          type="submit"
          id="btnConfirmationDelete"
          onClick={props.handleConfirmedDelete}
        >
          SI
        </button>
      </PopupWithForm>

      {props.selectedCard && (
        <ImagePopup card={props.selectedCard} onClose={props.onClosePopups} />
      )}
    </main>
  );
}

export default Main;
