import { deleteCardFromServer, dislikeCardServer, likeCardServer } from "./api";
import { closeModal, openModal } from "./modal";

const deleteCardPopup = document.querySelector('.popup_type_delete-card');
const deleteCardForm = document.forms['delete-card'];
let cardForDelete;

// Функция создания карточки
export function createCard(data, openDeletePopup, liking, imageOpeningFunction, userID) {
  
  const cardTemplate = document.querySelector(`#card-template`).content;
  const cardElement = cardTemplate.querySelector(`.card`).cloneNode(true);
  const cardImage = cardElement.querySelector(`.card__image`);
  const cardTitle = cardElement.querySelector(`.card__title`);
  const cardLikesCounter = cardElement.querySelector('.likes_count');

  cardElement._id = data.cardID;

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

// Открытие модального окна удаления карточки
  const deleteButton = cardElement.querySelector(`.card__delete-button`);
  deleteButton.addEventListener(`click`, () => openDeletePopup(cardElement));

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

//Обработчик открытия модального окна удаления карточки
export function openDeletePopupFunction (card) {
  cardForDelete = card;

  console.log(cardForDelete);
  console.log(cardForDelete._id);

  openModal(deleteCardPopup);
}

//Обработчик удаления карточки ч/з модальное окно
function deleteCardFormSubmit(evt) {
  evt.preventDefault();

  const popupButton = deleteCardPopup.querySelector('.popup__button');
  popupButton.textContent = 'Удаление...'
  popupButton.disabled = true;

  deleteCardFromServer(cardForDelete._id)
    .then(() => {
      cardForDelete.remove();
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

//Вешаем слушатель события отправки формы удаления карточки
deleteCardForm.addEventListener('submit', deleteCardFormSubmit);

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