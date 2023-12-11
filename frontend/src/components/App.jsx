import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup.jsx";
import DeletePopup from "./DeletePopup";
import InfoToolTip from "./InfoTooltip.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import ProtectedRouteElement from "./ProtectedRoute.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api.js";
import { auth } from "../utils/auth.js";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isSucceeded, setIsSucceeded] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getAllCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  const handleTokenCheck = (jwt) => {
    auth
      .checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      handleTokenCheck(jwt);
    }
  }, []);

  const handleRegistration = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        if (res.error) {
          setIsSucceeded(false);
          setInfoTooltipOpen(true);
        } else {
          setIsSucceeded(true);
          setInfoTooltipOpen(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setIsSucceeded(false);
        setInfoTooltipOpen(true);
        console.log(err);
      });
  };

  const handleLogIn = (email, password) => {
    auth
      .login(email, password)
      .then((res) => {
        if (!res) throw new Error("Ошибка авторизации");
        if (res) {
          localStorage.setItem("jwt", res.token);
          localStorage.setItem("email", email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipOpen(true);
        setIsSucceeded(false);
      });
  };

  const handleLogOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/signin", { replace: true });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);
    console.log(card._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function confirmDelete(card) {
    setIsDeletePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== selectedCard._id);
        setCards(newCards);
        setSelectedCard({});
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleClickCard(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleClickOverlay(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .changeUserInfo(data)
      .then(() => {
        setCurrentUser({ ...currentUser, ...data });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .changeAvatar(avatar)
      .then(() => {
        setCurrentUser({ ...currentUser, ...avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setInfoTooltipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onSignOut={handleLogOut} />
        <Routes>
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegistration} />}
          />
          <Route path="/signin" element={<Login onLogIn={handleLogIn} />} />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                onAddPlace={() => setIsAddPlacePopupOpen(true)}
                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                onCard={handleClickCard}
                onCardLike={handleCardLike}
                onCardDelete={confirmDelete}
              />
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          onOverlay={handleClickOverlay}
        />
        <InfoToolTip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSucceeded={isSucceeded}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
