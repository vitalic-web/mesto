// показ ошибки
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass); //'popup__input_error'
  errorElement.textContent = errorMessage;
};

// скрытие ошибки
const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass); //'popup__input_error'
  errorElement.textContent = '';
};

// проверка валидности всех форм
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// блокировка кнопки если хотя бы одна форма невалидна
const toggleButtonState = (inputList, buttonElement,  inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass); //'popup__save-button_inactive'
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass); //'popup__save-button_inactive'
    buttonElement.disabled = false;
  }
}

// проверка на валидность и показ/скрытие ошибки
const isValid = (formElement, inputElement, classElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classElement);
  } else {
    hideInputError(formElement, inputElement, classElement);
  }
};

// обработчик на каждый инпут с проверкой валидности
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector)); //'.popup__input'
  const buttonElement = formElement.querySelector(submitButtonSelector); //'.popup__save-button'

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputErrorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    })
  })
}

// валидность на всю страницу
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector)); //'.popup__container'

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

  setEventListeners(formElement, options.inputSelector, options.submitButtonSelector, options.inputErrorClass, options.inactiveButtonClass);
  })
}

// очистка ошибки при открытии попап
const clearError = () => {
  const profile = document.querySelector('.profile');
  const profileButton = profile.querySelector('.profile__title-button');
  const photoButton = profile.querySelector('.profile__add-button');
  const popupProfile = document.querySelector('.popup_edit_profile');
  const popupPhoto = document.querySelector('.popup_add_photo');

  profileButton.addEventListener('click', () => {
    hideInputError(popupProfile, popupProfile.querySelector('.popup__input_filed_name'), 'popup__input_error');
    hideInputError(popupProfile, popupProfile.querySelector('.popup__input_filed_prof'), 'popup__input_error');
  })

  photoButton.addEventListener('click', () => {
    hideInputError(popupPhoto, popupPhoto.querySelector('.popup__input_filed_name'), 'popup__input_error');
    hideInputError(popupPhoto, popupPhoto.querySelector('.popup__input_filed_prof'), 'popup__input_error');
  })
}

clearError();

// включение валидности
enableValidation(validationSetup);
