// Открытие модального окна
export function openModal(modal) {
    modal.classList.add('popup_is-opened');

    document.addEventListener('keydown', сlosePopupByKeyEvent);
    modal.addEventListener('click', closePopupByClickEvents);
}

// Закрытие модального окна
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened')

    document.removeEventListener('keydown', сlosePopupByKeyEvent);
    modal.removeEventListener('click', closePopupByClickEvents);
}

// Закрытие по нажатию на клавищу escape
function сlosePopupByKeyEvent(evt) {
    if(evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}

// Закрытие по нажатию на пустую область или кнопку крестика
function closePopupByClickEvents (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closeModal(evt.currentTarget);
    }
}