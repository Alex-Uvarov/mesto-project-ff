import { deleteCardFromServer, dislikeCardServer, likeCardServer } from "./api";
import { closeModal, openModal } from "./modal";

const deleteCardPopup = document.querySelector('.popup_type_delete-card');

// Функция создания карточки
export function createCard(data, deleteFunction, liking, imageOpeningFunction, userID, cardID) {
  
  const cardTemplate = document.querySelector(`#card-template`).content;
  const cardElement = cardTemplate.querySelector(`.card`).cloneNode(true);
  const cardImage = cardElement.querySelector(`.card__image`);
  const cardTitle = cardElement.querySelector(`.card__title`);
  const cardLikesCounter = cardElement.querySelector('.likes_count');

  cardElement._id = cardID;

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

// Удаление крточки
  const deleteButton = cardElement.querySelector(`.card__delete-button`);
  deleteButton.addEventListener(`click`, () => deleteFunction(cardElement));

  if(userID !== data.owner._id) {
    deleteButton.classList.add("card__delete-button-hidden")
  }

// Лайкинг карточки
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click',() => liking(cardElement));

  // Счетчик лайков
  if(data.likes.length !== 0) {
    cardLikesCounter.textContent = data.likes.length;
    cardLikesCounter.classList.add('likes_count_active');
  } else {
    cardLikesCounter.classList.remove('likes_count_active');
  }

  //Проверка при создании на то, есть ли лайк пользователя на этой карточке
  data['likes'].forEach((item) => {
    if(item._id === `${userID}`) {
      likeButton.classList.add('card__like-button_is-active');
    }
  })
  
//Открытие попапа фотографии
  cardImage.addEventListener('click',() => imageOpeningFunction(data.link, data.name));

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(card) {
  const cardID = card._id;
  openModal(deleteCardPopup);

  const deleteCardFormSubmit = (evt) => {
    evt.preventDefault();

    const popupButton = deleteCardPopup.querySelector('.popup__button');
    popupButton.textContent = 'Удаление...'
    popupButton.disabled = true;

    deleteCardFromServer(cardID)
      .then(() => {
        card.remove();
        closeModal(deleteCardPopup);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupButton.textContent = 'Да';
        popupButton.disabled = false;
      })
  }

  document.forms['delete-card'].addEventListener('submit', deleteCardFormSubmit)

}

// Функция добавления лайка на карточку
export function likeCard(card) {
  const button = card.querySelector('.card__like-button');
  const counter = card.querySelector('.likes_count')
  if (!button.classList.contains('card__like-button_is-active')) {
    likeCardServer(card._id)
    .then((res) => {
      button.classList.toggle('card__like-button_is-active');
      counter.textContent = res.likes.length;
      counter.classList.add('likes_count_active');
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
  } else {
    dislikeCardServer(card._id)
    .then((res) => {
      button.classList.toggle('card__like-button_is-active');
      if (res.likes.length === 0) {
        counter.classList.remove('likes_count_active')
      }
      counter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }
}