import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  popupEditProfile,
  popupAddPhoto,
  profileEditButton,
  profileAddPhotoButton,
  nameInput,
  profInput,
  namePhotoInput,
  linkPhotoInput,
  photoContainer,
  templateSelector,
  initialCards,
  validationSetup
} from '../utils/constants.js';

// экземпляры классов для валидации на каждый попап
const validationPopupAddPhoto = new FormValidator(popupAddPhoto, validationSetup);
const validationPopupEditProfile = new FormValidator(popupEditProfile, validationSetup);

// экземпляр класса для открытия изображения в полную величину
const cardImage = new PopupWithImage('.popup_open_photo', '.popup-photo__text', '.popup-photo__image');

// выгрузка карточек из массива на страницу
const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(templateSelector, cardItem.name, cardItem.link,
      {
        handleCardClick: () => {
          cardImage.open(cardItem.name, cardItem.link);
        }
      })

    const cardElement = card.generateCard();
    cardImage.setEventListeners();

    cardList.addItem(cardElement);
  }
}, '.elements');

cardList.renderItems();

// экземпляр класса с информацией о пользователе
const userProfileInfo = new UserInfo('.profile__title-name', '.profile__subtitle');

// попап формы
const formUser = new PopupWithForm(
  '.popup_edit_profile',
  {handleFormSubmit: (inputValues) => {
    userProfileInfo.setUserInfo(inputValues);
  }}
)

formUser.setEventListeners();

// слушатель на кнопку открытия попапа профиля
profileEditButton.addEventListener('click', () => {
  formUser.open();

  const userInputList = userProfileInfo.getUserInfo();
  nameInput.value = userInputList.name;
  profInput.value = userInputList.prof;

  validationPopupEditProfile.clearError(nameInput);
  validationPopupEditProfile.clearError(profInput);
});

// попап добавления фото
const formPhoto = new PopupWithForm(
  '.popup_add_photo',
  {handleFormSubmit: (inputValues) => {
    const card = new Card(
      templateSelector,
      inputValues.place,
      inputValues.link,
      {handleCardClick: () => {
        cardImage.open(inputValues.place, inputValues.link);
      }})

    const cardElement = card.generateCard();
    cardImage.setEventListeners();
    photoContainer.prepend(cardElement);
  }})

formPhoto.setEventListeners();

// слушатель на кнопку добавления фото
profileAddPhotoButton.addEventListener('click', () => {
  formPhoto.open();

  validationPopupAddPhoto.clearError(namePhotoInput);
  validationPopupAddPhoto.clearError(linkPhotoInput);
})

// добавление валидации на всю страницу
validationPopupAddPhoto.enableValidation();
validationPopupEditProfile.enableValidation();
