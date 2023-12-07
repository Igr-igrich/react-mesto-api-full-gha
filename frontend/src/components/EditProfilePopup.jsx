import React from "react";
import PopupWithForm from "./Popupwithform.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        type="text"
        id="name-input"
        className="popup__input"
        value={name || ""}
        onChange={handleChangeName}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <p className="popup__span-paragraph">
        <span className="popup__input-error name-input-error"></span>
      </p>
      <input
        name="info"
        type="text"
        id="job-input"
        className="popup__input"
        value={description || ""}
        onChange={handleChangeDescription}
        placeholder="Работа"
        minLength="2"
        maxLength="200"
        required
      />
      <p className="popup__span-paragraph">
        <span className="popup__input-error job-input-error"></span>
      </p>
    </PopupWithForm>
  );
}
