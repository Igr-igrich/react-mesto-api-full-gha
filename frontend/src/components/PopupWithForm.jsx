export default function PopupWithForm({
  title,
  name,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  function handleClickOverlay(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      onClose();
    }
  }

  return (
    <div
      onClick={(evt) => handleClickOverlay(evt)}
      className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className="popup__form popup__form_profile"
          name={name}
        >
          {children}
          <button type="submit" className="popup__button">
            {buttonText}
          </button>
        </form>
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
        ></button>
      </div>
    </div>
  );
}
