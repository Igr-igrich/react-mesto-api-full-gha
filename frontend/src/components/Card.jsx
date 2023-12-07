import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  card,
  name,
  link,
  sumLikes,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(id => id === currentUser._id);

  const cardLikeButtonClassName = `elements__like-button ${
    isLiked && "elements__like-button_active"
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__item">
      <img
        onClick={() => onCardClick({ name, link })}
        alt={name}
        className="elements__img"
        src={link}
      />
      <div className="elements__wrapper">
        <h2 className="elements__title">{name}</h2>
        <div className="elements__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="Кнопка лайка"
          ></button>
          <p className="elements__like-counter">{sumLikes}</p>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="elements__delete-button elements__delete-button_active"
          onClick={handleDeleteClick}
          aria-label="Удаление карточки"
        />
      )}
    </li>
  );
}
