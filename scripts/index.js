import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const popupEditProfile = document.querySelector('.popup_edit_profile'); // попап редактирования профиля
const popupAddPhoto = document.querySelector('.popup_add_photo'); // попап добавления фотки
const popupOpenPhoto = document.querySelector('.popup_open_photo'); // попап открытия фотки
const profileEditButton = document.querySelector('.profile__title-button'); // кнопка редактировать профиль
const profileAddPhotoButton = document.querySelector('.profile__add-button'); // кнопка добавить фото
const nameInput = popupEditProfile.querySelector('.popup__input_filed_name'); // поле ввода имени
const profInput = popupEditProfile.querySelector('.popup__input_filed_prof'); // поле ввода профессии
const namePhotoInput = popupAddPhoto.querySelector('.popup__input_filed_name'); // поле ввода названия фотки
const linkPhotoInput = popupAddPhoto.querySelector('.popup__input_filed_prof'); // поле ввода ссылки на фотку
const nameOutput = document.querySelector('.profile__title-name'); // имя на странице
const profOutput = document.querySelector('.profile__subtitle'); // профессия на странице
const popupForm = popupEditProfile.querySelector('.popup__container'); // окно попапа редактирования
const popupFormPhoto = popupAddPhoto.querySelector('.popup__container'); // окно попапа добавления фотки
const photoContainer = document.querySelector('.elements'); // контейнер всех фоток

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

const validationSetup = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_error',
}

const validationPopupAddPhoto = new FormValidator(popupAddPhoto, validationSetup);
const validationPopupEditProfile = new FormValidator(popupEditProfile, validationSetup);

// функция переключения попап
function togglePopup(element) {
  element.classList.toggle('popup_active');
}

// функция закрытия попапа
function closePopup(item) {
  item.querySelector('.popup__close-icon').addEventListener('click', function(){
    togglePopup(item);
  })
}

// функция открытия попапа редактирования профиля с заполнением полей информацией со страницы
function openEditProfile() {
  togglePopup(popupEditProfile);

  if (popupEditProfile.classList.contains('popup_active')) {
    nameInput.value = nameOutput.textContent;
    profInput.value = profOutput.textContent;
    validationPopupEditProfile.clearError(nameInput);
    validationPopupEditProfile.clearError(profInput);
  }
}

// функция для отправки формы редактирования профиля на страницу
function formEditProfile(evt) {
  evt.preventDefault();

  nameOutput.textContent = nameInput.value;
  profOutput.textContent = profInput.value;

  openEditProfile();
}

// цикл на добавление на страницу фоток из массива
initialCards.forEach(function (item) {
  const card = new Card('#element-template', item.name, item.link);
  const cardElement = card.generateCard();

  photoContainer.append(cardElement);
})

function formAddPhoto(evt) {
  evt.preventDefault();

  const card = new Card('#element-template', namePhotoInput.value, linkPhotoInput.value);
  const cardElement = card.generateCard();

  photoContainer.prepend(cardElement);
  togglePopup(popupAddPhoto);
}

closePopup(popupEditProfile); // закрытие окна редактирования профиля
closePopup(popupAddPhoto); // закрытие окна добавления фотки
closePopup(popupOpenPhoto); // закрытие окна увеличенной фотки

// событие по клику на открытие попапа редактирования профиля
profileEditButton.addEventListener("click", openEditProfile);

// событие по клику на открытие попапа добавления фотки
profileAddPhotoButton.addEventListener("click", function() {
  togglePopup(popupAddPhoto);
  namePhotoInput.value = '';
  linkPhotoInput.value = '';
  validationPopupAddPhoto.clearError(namePhotoInput);
  validationPopupAddPhoto.clearError(linkPhotoInput);

});

// событие при клике на "сохранить" в профиле
popupForm.addEventListener('submit', formEditProfile);

// событие при клике на "создать" в дабавлении фотки
popupFormPhoto.addEventListener('submit', formAddPhoto);

// закрытие попап нажатием на оверлей
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup_active')) {
    togglePopup(document.querySelector('.popup_active'));
  }
})

// закрытие попап нажатием клавиши Escape
document.addEventListener('keydown', (evt) => {
  if (evt.key === "Escape") {
    togglePopup(document.querySelector('.popup_active'));
  }
})

// добавление валидации на всю страницу
const formList = Array.from(document.querySelectorAll(validationSetup.formSelector));

formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const popupForm = new FormValidator(formElement, validationSetup);
  popupForm.enableValidation();
  })
