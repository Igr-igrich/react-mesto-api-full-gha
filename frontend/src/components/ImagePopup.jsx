export default function ImagePopup({ card, isOpen, onClose, onOverlay }) {
  return (
    <div
      onClick={onOverlay}
      className={`popup popup_image ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__image-wrapper">
        <img src={card.link} alt={card.name} className="popup__image-opened" />
        <p className="popup__image-text">{card.name}</p>
        <button
          type="button"
          onClick={onClose}
          className="popup__close-button popup__close-button_image"
          aria-label="Кнопка закрытия добавления карточек"
        ></button>
      </div>
    </div>
  );
}
