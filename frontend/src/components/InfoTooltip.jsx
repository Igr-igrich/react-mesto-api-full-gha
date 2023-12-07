import React from "react";
import registrationSuccess from "../../images/registration-success.svg";
import registrationFailed from "../../images/registration-failed.svg";

export default function InfoToolTip({ isOpen, onClose, isSucceeded }) {
  return (
    <div className={`popup popup_InfoToolTip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
        ></button>
        <img
          src={isSucceeded ? registrationSuccess : registrationFailed}
          alt=""
          className="popup__infoTooltip-image"
        />
        <h2 className="popup__infoTooltip-text">
          {isSucceeded
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}
