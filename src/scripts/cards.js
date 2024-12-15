// Функция создания карточки
export function createCard(data, deleteFunction, liking, imageOpeningFunction) {
  const cardTemplate = document.querySelector(`#card-template`).content;
  const cardElement = cardTemplate.querySelector(`.card`).cloneNode(true);
  const cardImage = cardElement.querySelector(`.card__image`);
  const cardTitle = cardElement.querySelector(`.card__title`);
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  const deleteButton = cardElement.querySelector(`.card__delete-button`);
  deleteButton.addEventListener(`click`, () => deleteFunction(cardElement));

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', liking);

  cardImage.addEventListener('click',() => imageOpeningFunction(data.link, data.name));

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

// Функция добавления лайка на карточку
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}