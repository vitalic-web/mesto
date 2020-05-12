// создаем переменные для открытия и закрытия попапа
const profileEditButton = document.querySelector('.profile__title-button');
const popupCloseButton = document.querySelector('.popup__close-icon');

// создаем переменные для отображения на странице и полей форм
let nameInput = document.querySelector('.popup__input_name');
let profInput = document.querySelector('.popup__input_prof');
let nameOutput = document.querySelector('.profile__title-name');
let profOutput = document.querySelector('.profile__subtitle');


//создаем переменную попапа
//добавляем класс отображения попапа
let visiblePopup = document.querySelector('.popup');
visiblePopup.classList.add('popup__active');

//создаем функцию на открытие/закрытие попап
//так же условие if добаляет текст со страницы
function openPopup() {
  visiblePopup.classList.toggle('popup');

  if (visiblePopup.classList.contains('popup__active')) {
    nameInput.value = nameOutput.textContent;
    profInput.value = profOutput.textContent;
  }
}

// добавляем событие по клику на открытие/закрытие попапа
profileEditButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", openPopup);


// создаем переменную для внесения изменений в попап
let popupForm = document.querySelector('.popup__container');

// создаем функцию для отправки формы на страницу
// добавляем функцию openPopup для закрытия окна псоле ввода данных
function formSubmitHandler(evt) {
  evt.preventDefault();

  nameOutput.textContent = nameInput.value;
  profOutput.textContent = profInput.value;

  openPopup();
}

// добавляем событие при клике на "сохранить"
popupForm.addEventListener('submit', formSubmitHandler);












