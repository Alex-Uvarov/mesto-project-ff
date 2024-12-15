import { cardElement } from "..";

// Функция создания карточки
export function cardCreating(data, deleteFunction, liking, imageOpeningFunction) {
  const cardElementClone = cardElement.cloneNode(true);
  const cardImage = cardElementClone.querySelector(`.card__image`);
  const cardTitle = cardElementClone.querySelector(`.card__title`);
  cardImage.src = data.link;
  cardImage.alt = data.altText;
  cardTitle.textContent = data.name;

  const deleteButton = cardElementClone.querySelector(`.card__delete-button`);
  deleteButton.addEventListener(`click`, () => deleteFunction(cardElementClone));

  const likeButton = cardElementClone.querySelector('.card__like-button');
  likeButton.addEventListener('click', liking);

  cardImage.addEventListener('click',() => imageOpeningFunction(data.link, data.name));

  return cardElementClone;
}

// Функция удаления карточки
export function cardDeleteFunction(card) {
  card.remove();
}

// Функция добавления лайка на карточку
export function cardLiking(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}