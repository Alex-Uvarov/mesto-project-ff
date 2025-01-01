import { deleteCardFromServer, dislikeCardServer, likeCardServer } from "./api";

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
  deleteCardFromServer(cardID)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// Функция добавления лайка на карточку
export function likeCard(card) {
  const button = card.querySelector('.card__like-button');
  const counter = card.querySelector('.likes_count')
  console.log(card._id)
  if (!button.classList.contains('card__like-button_is-active')) {
    likeCardServer(card._id)
    .then(() => {
      button.classList.add('card__like-button_is-active');
      counter.textContent = Number(counter.textContent) + 1;
      counter.classList.add('likes_count_active');
    })
  } else {
    dislikeCardServer(card._id)
    .then(() => {
      button.classList.remove('card__like-button_is-active');
      if (Number(counter.textContent) - 1 === 0) {
        counter.classList.remove('likes_count_active')
        counter.textContent = Number(counter.textContent) - 1;
      } else {
        counter.textContent = Number(counter.textContent) - 1;
      }
    })
  }
}