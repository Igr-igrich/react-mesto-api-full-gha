import React from "react";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCard,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile container">
        <div className="profile__content-wrapper">
          <a
            onClick={onEditAvatar}
            href="#"
            className="profile__image"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></a>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              className="profile__edit-button"
              aria-label="Кнопка редактирования профиля"
            ></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-button"
          aria-label="Кнопка добавления карточек"
        ></button>
      </section>
      <section className="elements container">
        <ul className="elements__items">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              name={card.name}
              link={card.link}
              sumLikes={card.likes.length}
              onCardClick={onCard}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
