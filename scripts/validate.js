// показ ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
};

// скрытие ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove('popup__input_error');
  errorElement.textContent = '';
};

// закрытие попап нажатием на оверлей ПОПРОБОВАТЬ ЧЕРЕЗ ЦИКЛ forEach
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup_active')) {
    togglePopup(document.querySelector('.popup_active'));
  }
})

// закрытие попап нажатием клавиши Escape
document.addEventListener('keydown', (evt) => {
  console.log(evt);
  if (evt.key === "Escape") {
    togglePopup(document.querySelector('.popup_active'));
  }
})

// очистка ошибки при открытии попап
const clearError = () => {
  const profile = document.querySelector('.profile');
  const profileButton = profile.querySelector('.profile__title-button');
  const photoButton = profile.querySelector('.profile__add-button');
  const popupProfile = document.querySelector('.popup_edit_profile');
  const popupPhoto = document.querySelector('.popup_add_photo');

  profileButton.addEventListener('click', () => {
    hideInputError(popupProfile, popupProfile.querySelector('.popup__input_name'));
    hideInputError(popupProfile, popupProfile.querySelector('.popup__input_prof'));
  })

  photoButton.addEventListener('click', () => {
    hideInputError(popupPhoto, popupPhoto.querySelector('.popup__input_name'));
    hideInputError(popupPhoto, popupPhoto.querySelector('.popup__input_prof'));
  })
}

clearError();

// проверка валидности всех форм
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// блокировка кнопки если хотя бы одна форма невалидна
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive');
  } else {
    buttonElement.classList.remove('popup__save-button_inactive');
  }
}

// проверка на валидность и показ/скрытие ошибки
const isValid = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// обработчик на каждый инпут с проверкой валидности
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save-button');

  // toggleButtonState(inputList, buttonElement); АКТИВИРОВАТЬ ПОСЛЕ ДОБАВЛЕНИЯ МАССИВА

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
      toggleButtonState(inputList, buttonElement);
    })
  })
}

// валидность на всю страницу
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

  setEventListeners(formElement);
  })
}

// включение валидности, заполнить массивом из ТЗ
enableValidation();
