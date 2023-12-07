// ===== Данные API =====
export const token = "0d528a1c-b290-4b8d-8d61-a78176d9250d";
export const configApi = {
  url: "https://mesto.nomoreparties.co/v1/",
  headers: {
    authorization: "0d528a1c-b290-4b8d-8d61-a78176d9250d",
    "Content-Type": "application/json",
    groupId: "cohort-73",
  },
};

// Попап для редактирования профиля
export const editPopup = document.querySelector(".popup_profile-edit");
export const openPopupButton = document.querySelector(".profile__edit-button");
export const closePopupButton = document.querySelector(
  ".popup__close-button_profile",
);
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const inputTitle = document.querySelector(".popup__input_profile_name");
export const inputSubtitle = document.querySelector(
  ".popup__input_profile_job",
);
export const editForm = document.querySelector(".popup__form_profile");

// Попап для добавления карточек
export const editPopupAdd = document.querySelector(".popup_card");
export const openPopupAddButton = document.querySelector(
  ".profile__add-button",
);
export const closePopupAddButton = document.querySelector(
  ".popup__close-button_card",
);
export const editFormAdd = document.querySelector(".popup__form_card");
export const nameInputEditFormAdd = document.querySelector("#card-name-input");
export const linkInputEditFormAdd = document.querySelector("#url-input");
export const buttonSubmitEditFormAdd = document.querySelector(
  ".popup__close-button_card",
);

// Шаблон карточки
export const template = document.querySelector(".elements__item-template");
export const templateContent = template.content;
export const cardElement = templateContent.querySelector(".elements__item");
export const cardImageTitle = cardElement.querySelector(".elements__title");
export const cardImage = cardElement.querySelector(".elements__img");
export const cardDeleteButton = cardElement.querySelector(
  ".elements__delete-button",
);
export const cardLikeIcon = cardElement.querySelector(".elements__like-button");

// Попап полноразмерной картинки
export const popupFullImage = document.querySelector(".popup_image");
export const popupFullImageItem = document.querySelector(
  ".popup__image-opened",
);
export const popupFullImageTitle = document.querySelector(".popup__image-text");
export const cardElements = document.querySelector(".elements__items");
export const popupFullImageCloseButton = document.querySelector(
  ".popup__close-button_image",
);

// Попап изменения аватарки
export const buttonEditAvatar = document.querySelector(".profile__image");
export const editAvatar = document.querySelector(".popup__form_avatar");

