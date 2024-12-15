// Открытие модального окна
export function openModal(modal) {
    modal.classList.add('popup_is-opened');

    document.addEventListener('keydown', popupCloseByKeyEvent);
    modal.addEventListener('click', popupCloseByClickEvents);
}

// Закрытие модального окна
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened')

    document.removeEventListener('keydown', popupCloseByKeyEvent);
    modal.removeEventListener('click', popupCloseByClickEvents);
}

// Закрытие по нажатию на клавищу escape
function popupCloseByKeyEvent(evt) {
    if(evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}

// Закрытие по нажатию на пустую область или кнопку крестика
function popupCloseByClickEvents (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closeModal(evt.currentTarget);
    }
}

// Открытие модального окна с картинкой
export function imageOpening(link, name) {
    const imagePopup = document.querySelector('.popup_type_image');
    const imageinPopup = imagePopup.querySelector('.popup__image');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');

    imageinPopup.src = link;
    imageinPopup.alt = name;
    imagePopupCaption.textContent = name;
    openModal(imagePopup);
}