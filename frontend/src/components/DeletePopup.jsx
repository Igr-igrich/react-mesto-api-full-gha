import PopupWithForm from "./Popupwithform.jsx";

function ConfirmDeletePopup({ isOpen, onClose, onDeleteCard, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name="deleteCard"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Удаление..." : "Да"}
    />
  );
}

export default ConfirmDeletePopup;
