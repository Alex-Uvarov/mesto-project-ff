import './pages/index.css';
import { createCard, likeCard, openDeletePopupFunction } from './scripts/cards';
import { openModal, closeModal} from './scripts/modal';
import { enableValidation, clearValidation } from './scripts/validation';
import { getInitialCards, getUserProfile, updateUserProfile, addNewCardToServer, changeAvatarServer} from './scripts/api';

// Выбор элементов
const cardsContainer = document.querySelector(`.places__list`);
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileAvatar = document.querySelector('.profile__image');
const profileEditForm = document.forms['edit-profile'];
const profileDescription = document.querySelector('.profile__description');
const newCardButton = document.querySelector('.profile__add-button');
const newCardForm = document.forms['new-place'];
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const editAvatarButton = document.querySelector('.profile__image-edit-button');
const editAvatarForm = document.forms['avatar'];
const imagePopup = document.querySelector('.popup_type_image');
const imageinPopup = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

//Определеяем глобальную переменную с ID пользователя
let userID;

// Получаем данные из запросов
Promise.all([getUserProfile(), getInitialCards()])
    .then(([user, cards]) => {
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
        profileAvatar.style['background-image'] = `url('${user.avatar}')`;

        userID = user._id;

        cards.forEach((card) => {
            cardsContainer.append(createCard(card, openDeletePopupFunction, likeCard, openImage, userID));
        })
    })
    .catch((err) => console.log(`Ошибка: ${err}`));

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

    clearValidation(profileEditForm, validationSettings);
})

// Обработчик события отправки формы измения профиля
function submitProfileEditForm(evt) {
    evt.preventDefault();

    const popupButton = popupEdit.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...'
    popupButton.disabled = true;

    const userProfileInfo = {
        name: profileEditForm.name.value,
        about: profileEditForm.description.value
    };

    updateUserProfile(userProfileInfo)
        .then((user) => {

            profileTitle.textContent = user.name;
            profileDescription.textContent = user.about;

            closeModal(popupEdit);
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
        .finally(() => {
            popupButton.textContent = 'Сохранить';
            popupButton.disabled = false;
        })
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
    
    const popupButton = popupNewCard.querySelector('.popup__button');
    popupButton.textContent = 'Создание...'
    popupButton.disabled = true;

    //Добавление карточки на сервер
    addNewCardToServer({
        name: newCardForm['place-name'].value,
        link: newCardForm.link.value
    })
        .then(card => {

            //Определение начальных данных карточки
            const data = {
                name: card.name,
                link: card.link,
                likes: card.likes,
                cardID: card._id,
                owner: {
                _id: userID,
            }
        }   
            //Добавляем карточку на страницу
            cardsContainer.prepend(createCard(data, openDeletePopupFunction, likeCard, openImage, userID));

            //Закрываем модальное окно
            closeModal(popupNewCard);
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
        .finally(() => {
            popupButton.textContent = 'Создать'
            popupButton.disabled = false;
        })

    newCardForm.reset();

    clearValidation(newCardForm, validationSettings);
}

//Вешаем слушатель события отправки формы добавления новой карточки
newCardForm.addEventListener ('submit', submitNewCardForm);

//Вешаем слушатель события клика по аватару
editAvatarButton.addEventListener('click',() => openModal(popupEditAvatar))

//Обработчик события клика на кнопку отправки формы изменения аватара
function submitNewAvatarForm (evt) {
    evt.preventDefault();

    const popupButton = popupEditAvatar.querySelector('.popup__button');
    popupButton.textContent = 'Сохранение...'
    popupButton.disabled = true;

    const avatar = {
        avatar: editAvatarForm.link.value
    }

    //Обновление аватара на сервере
    changeAvatarServer(avatar)
    .then((res) => {
        profileAvatar.style['background-image'] = `url('${res.avatar}')`;
        closeModal(popupEditAvatar);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
        popupButton.textContent = 'Сохранить'
        popupButton.disabled = false;
    })

    editAvatarForm.reset();
    clearValidation(editAvatarForm, validationSettings);
}

//Вешаем слушатель события отправки формы обновления аватара
editAvatarForm.addEventListener ('submit', submitNewAvatarForm);

//Включаем валидацию форм
enableValidation(validationSettings);