// создаем переменные
const profileEditButton = document.querySelector('.profile__title-button');
const popupCloseButton = document.querySelector('.popup__close-icon');
const nameInput = document.querySelector('.popup__input_name');
const profInput = document.querySelector('.popup__input_prof');
const nameOutput = document.querySelector('.profile__title-name');
const profOutput = document.querySelector('.profile__subtitle');
const visiblePopup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__container');

//создаем функцию на открытие/закрытие попап
//так же условие if добаляет текст со страницы
function openPopup() {
  visiblePopup.classList.toggle('popup_active');

  if (visiblePopup.classList.contains('popup_active')) {
    nameInput.value = nameOutput.textContent;
    profInput.value = profOutput.textContent;
  }
}

// создаем функцию для отправки формы на страницу
// добавляем функцию openPopup для закрытия окна псоле ввода данных
function formSubmitHandler(evt) {
  evt.preventDefault();

  nameOutput.textContent = nameInput.value;
  profOutput.textContent = profInput.value;

  openPopup();
}

// добавляем событие по клику на открытие/закрытие попапа
profileEditButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", openPopup);

// добавляем событие при клике на "сохранить"
popupForm.addEventListener('submit', formSubmitHandler);












