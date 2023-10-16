import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../index.css";
import Header from "./Header";
import Register from "./Registrer";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import Main from "./Main";
import AddPlacePopup from "./AddPlacePopup";
import Footer from "./Footer";
import { authorize, checkToken, register } from "../utils/auth";
import api from "../utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("jwt"));

  // Popup states
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteForm, setDeleteForm] = useState(false);

  // Card states
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // Tooltip states
  const [showTooltip, setShowTooltip] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");

  useEffect(() => {
    const validateAndSetUser = async () => {
      const token = localStorage.getItem("jwt");
      if (token) {
        try {
          const authUserData = await checkToken(token);
          if (authUserData && authUserData.email) {
            setCurrentUser(authUserData);
            setLoggedIn(true);
          } else {
            throw new Error("Invalid or missing email data.");
          }
        } catch (err) {
          localStorage.removeItem("jwt");
          setCurrentUser(null);
          setLoggedIn(false);
          console.log(err);
        }
      } else {
        setCurrentUser(null);
        setLoggedIn(false);
      }
    };

    validateAndSetUser();
  }, []);

  useEffect(() => {
    async function fetchInitialCards() {
      try {
        const cardsData = await api.getInitialCards("cards");
        setCards(cardsData);
      } catch (error) {
        console.error("Error fetching cards data:", error);
      }
    }

    if (loggedIn) {
      fetchInitialCards();
    }
  }, [loggedIn]);

  const handleRegister = async (password, email) => {
    try {
      const data = await register(password, email);
      if (data) {
        setIsSuccess(true);
        setShowTooltip(true);
      } else {
        setIsSuccess(false);
        setShowTooltip(true);
        throw new Error("Registro no exitoso");
      }
    } catch (error) {
      setIsSuccess(false);
      setShowTooltip(true);
      if (error.message === "Correo ya registrado") {
        setTooltipMessage("Este correo electrónico ya está registrado.");
      } else {
        setTooltipMessage("Uy, algo salió mal. Por favor, inténtalo de nuevo.");
      }
    }
  };

  const handleLogin = async (password, email) => {
    try {
      const data = await authorize(password, email);

      if (data.token) {
        localStorage.setItem("jwt", data.token);
        try {
          const userData = await checkToken(data.token);
          setCurrentUser(userData);
          setLoggedIn(true);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      localStorage.removeItem("jwt");
      setIsSuccess(false);
      setShowTooltip(true);

      setTooltipMessage(
        err.message || "Hubo un error al iniciar sesión. Inténtalo de nuevo."
      );
    }
  };

  const closeTooltip = () => {
    setShowTooltip(false);
  };

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleUpdateUser = async (data) => {
    try {
      const updatedUser = await api.setUserInfo(
        data.name,
        data.about,
        "users/me"
      );
      setCurrentUser(updatedUser);
      closeAllPopups();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      const updatedAvatar = await api.setUserPicture(
        data.avatar,
        "users/me/avatar"
      );
      setCurrentUser((prevState) => ({
        ...prevState,
        avatar: updatedAvatar.avatar,
      }));
      closeAllPopups();
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleCardDelete = (id) => {
    handleDeleteForm();
    setCardToDelete(id);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((userId) => userId._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) =>
        state.map((cardItem) =>
          cardItem._id === card._id ? newCard : cardItem
        )
      );
    });
  }

  const handleConfirmedDelete = async (event) => {
    event.preventDefault();

    try {
      await api.deleteCard(`cards/${cardToDelete}`);
      setCards((cards) => cards.filter((card) => card._id !== cardToDelete));
      closeAllPopups();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };
  
  const handleAddPlaceSubmit = async (newCardData) => {
    try {
      const newCard = await api.setCard(
        newCardData.name,
        newCardData.link,
        "cards"
      );
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (error) {
      setShowTooltip(true);
      setTooltipMessage(
        error.message ||
          "Hubo un error al agregar la tarjeta. Inténtalo de nuevo."
      );
    }
  };

  const handleDeleteForm = () => {
    setDeleteForm(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setDeleteForm(false);
    setSelectedCard(null);
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setUser: setCurrentUser }}
    >
      <Router>
        <div className="page">
          <Header onLogout={handleLogout} />
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/main" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
            <Route
              path="/signin"
              element={
                loggedIn ? (
                  <Navigate to="/main" replace />
                ) : (
                  <Login
                    onLogin={handleLogin}
                    setShowTooltip={setShowTooltip}
                    setIsSuccess={setIsSuccess}
                    setTooltipMessage={setTooltipMessage}
                  />
                )
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  onRegister={handleRegister}
                  loggedIn={loggedIn}
                  setShowTooltip={setShowTooltip}
                  setIsSuccess={setIsSuccess}
                  setTooltipMessage={setTooltipMessage}
                />
              }
            />
            <Route
              path="/main"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={
                    <Main
                      cards={cards}
                      onCardLike={handleCardLike}
                      onDeleteClick={handleCardDelete}
                      onEditProfileClick={handleEditProfileClick}
                      onAddPlaceClick={handleAddPlaceClick}
                      onEditAvatarClick={handleEditAvatarClick}
                      isDeleteForm={isDeleteForm}
                      onDeleteForm={handleDeleteForm}
                      onClosePopups={closeAllPopups}
                      selectedCard={selectedCard}
                      onCardClick={handleCardClick}
                      handleConfirmedDelete={handleConfirmedDelete}
                    />
                  }
                />
              }
            />
          </Routes>
          <InfoTooltip
            isSuccess={isSuccess}
            isOpen={showTooltip}
            onClose={closeTooltip}
            message={tooltipMessage}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />
          <Footer />
        </div>
      </Router>
    </CurrentUserContext.Provider>
  );
}

export default App;
