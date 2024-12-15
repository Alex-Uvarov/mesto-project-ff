import './pages/index.css';
import { initialCards } from './scripts/initialCards';
import { createCard, deleteCard, likeCard } from './scripts/cards';
import { openModal, closeModal} from './scripts/modal';

// Выбор элементов
const cardsContainer = document.querySelector(`.places__list`);
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileEditForm = document.forms['edit-profile'];
const profileDescription = document.querySelector('.profile__description');
const newCardButton = document.querySelector('.profile__add-button');
const newCardForm = document.forms['new-place'];
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');
const imageinPopup = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');


// Вывести начальные карточки на страницу
initialCards.forEach(function (item) {
    cardsContainer.append(createCard(item, deleteCard, likeCard, openImage));
})

// Открытие модального окна с картинкой
function openImage(link, name) {
    imageinPopup.src = link;
    imageinPopup.alt = name;
    imagePopupCaption.textContent = name;
    openModal(imagePopup);
}

// Вешаем слушатель события клика на кнопку изменения профиля
profileEditButton.addEventListener('click', () => {

    profileEditForm.name.value = profileTitle.textContent;
    profileEditForm.description.value = profileDescription.textContent;

    openModal(popupEdit);
})

// Обработчик события отправки формы измения профиля
function submitProfileEditForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileEditForm.name.value;
    profileDescription.textContent = profileEditForm.description.value;
    closeModal(popupEdit);
}

// Вешаем события отправки формы изменения профиля
profileEditForm.addEventListener ('submit', submitProfileEditForm);

// Вешаем слушатель события клика на кнопку добавления новой карточки
newCardButton.addEventListener('click', () => {
    openModal(popupNewCard);
})

//Обработчик события отправки формы добавления новой карточки
function submitNewCardForm(evt) {
    evt.preventDefault();

    const data = {
        name: newCardForm['place-name'].value,
        link: newCardForm.link.value,
    }; 

    cardsContainer.prepend(createCard(data, deleteCard, likeCard, openImage));

    closeModal(popupNewCard);

    newCardForm.reset();
}

//Вечаем слушатель события отправки формы добавления новой карточки
newCardForm.addEventListener ('submit', submitNewCardForm);
