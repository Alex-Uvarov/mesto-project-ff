import './pages/index.css';
import { initialCards } from './scripts/initialCards';
import { cardCreating, cardDeleteFunction, cardLiking } from './scripts/cards';
import { openModal, closeModal,  imageOpening} from './scripts/modal';

// Выбор элементов
const cardTemplate = document.querySelector(`#card-template`).content;
const placesList = document.querySelector(`.places__list`);
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileEditForm = document.forms['edit-profile'];
const profileDescription = document.querySelector('.profile__description');
const newCardButton = document.querySelector('.profile__add-button');
const newCardForm = document.forms['new-place'];
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');

// DOM узлы
export const cardElement = cardTemplate.querySelector(`.card`).cloneNode(true);


// Вывести карточки на страницу
initialCards.forEach(function (item) {
    placesList.append(cardCreating(item, cardDeleteFunction, cardLiking, imageOpening));
})

profileEditButton.addEventListener('click', () => {

    profileEditForm.name.value = profileTitle.textContent;
    profileEditForm.description.value = profileDescription.textContent;

    openModal(popupEdit);

    profileEditForm.addEventListener ('submit', handleFormSubmit);
})

newCardButton.addEventListener('click', () => {
    openModal(popupNewCard);

    newCardForm.addEventListener ('submit', newCardFormSubmit);
})

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileEditForm.name.value;
    profileDescription.textContent = profileEditForm.description.value;
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
}

function newCardFormSubmit(evt) {
    evt.preventDefault();

    const data = {
        name: newCardForm['place-name'].value,
        link: newCardForm.link.value,
        altText: newCardForm['place-name'].value
    }; 

    placesList.prepend(cardCreating(data, cardDeleteFunction, cardLiking, imageOpening));

    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);

    newCardForm.reset();
}