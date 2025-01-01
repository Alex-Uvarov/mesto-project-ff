const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}

export const clearValidation = (formElement, validationSettings) => {
    const formInputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    formInputList.forEach((inputElement) => hideInputError(formElement, inputElement, validationSettings));
    toggleButtonState(formInputList, buttonElement, validationSettings);
}

const showInputError = (formElement, inputElement, errorMessage , validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
}

const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(validationSettings.errorClass);
}

const checkInputValidity = (formElement, inputElement, validationSettings) => {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorText);
    } else {
        inputElement.setCustomValidity("");
    }

    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
        hideInputError(formElement, inputElement, validationSettings);
    }
}

function toggleButtonState (inputList, buttonElement, validationSettings) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    }
}

const setEventListeners = (formElement, validationSettings) => {
    const formInputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

    toggleButtonState(formInputList, buttonElement, validationSettings);

    formInputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationSettings);
            toggleButtonState(formInputList, buttonElement, validationSettings);
        });
    });
}

export const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationSettings);
    });
}