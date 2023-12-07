import React from "react";
import PopupWithForm from "./Popupwithform.jsx";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
}) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleAddCardName(e) {
    setName(e.target.value);
  }

  function handleAddCardLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }
  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="card-name-input"
        className="popup__input"
        placeholder="Название"
        onChange={handleAddCardName}
        value={name}
        name="name"
        required
        minLength="2"
        maxLength="30"
      />
      <p className="popup__span-paragraph">
        <span className="popup__input-error card-name-input-error"></span>
      </p>
      <input
        type="url"
        id="url-input"
        className="popup__input"
        placeholder="Ссылка на картинку"
        onChange={handleAddCardLink}
        value={link}
        name="link"
        required
      />
      <p className="popup__span-paragraph">
        <span className="popup__input-error url-input-error"></span>
      </p>
    </PopupWithForm>
  );
}
