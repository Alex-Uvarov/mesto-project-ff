// @todo: Темплейт карточки
const cardTemplate = document.querySelector(`#card-template`).content;
const placesList = document.querySelector(`.places__list`);

// @todo: DOM узлы
const cardElement = cardTemplate.querySelector(`.card`).cloneNode(true);

// @todo: Функция создания карточки
function cardCreating(data, deleteFunction) {
    const cardElementClone = cardElement.cloneNode(true);
    cardElementClone.querySelector(`.card__image`).src = data.link;
    cardElementClone.querySelector(`.card__image`).alt = data.altText;
    cardElementClone.querySelector(`.card__title`).textContent = data.name;

    const deleteButton = cardElementClone.querySelector(`.card__delete-button`);
    deleteButton.addEventListener(`click`, () => deleteFunction(cardElementClone));

    return cardElementClone;
}
// @todo: Функция удаления карточки
function cardDeleteFunction(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
    placesList.append(cardCreating(item, cardDeleteFunction));
})
