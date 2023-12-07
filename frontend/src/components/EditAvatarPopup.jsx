import React from "react";
import PopupWithForm from "./Popupwithform.jsx";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="url-input-avatar"
        className="popup__input"
        placeholder="Ссылка на картинку"
        name="link"
        ref={avatarRef}
        required
      />
      <p className="popup__span-paragraph">
        <span className="popup__input-error url-input-avatar-error"></span>
      </p>
    </PopupWithForm>
  );
}
