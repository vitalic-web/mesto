export const popupEditProfile = document.querySelector('.popup_edit_profile'); // попап редактирования профиля
export const popupAddPhoto = document.querySelector('.popup_add_photo'); // попап добавления фото
export const profileEditButton = document.querySelector('.profile__title-button'); // кнопка редактировать профиль
export const profileAddPhotoButton = document.querySelector('.profile__add-button'); // кнопка добавить фото
export const nameInput = popupEditProfile.querySelector('.popup__input_filed_name'); // поле ввода имени
export const profInput = popupEditProfile.querySelector('.popup__input_filed_prof'); // поле ввода профессии
export const namePhotoInput = popupAddPhoto.querySelector('.popup__input_filed_name'); // поле ввода названия фото
export const linkPhotoInput = popupAddPhoto.querySelector('.popup__input_filed_prof'); // поле ввода ссылки на фото
export const photoContainer = document.querySelector('.elements'); // контейнер всех фото
export const templateSelector = '#element-template'; // селектор шаблона

export const initialCards = [
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

export const validationSetup = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_error',
}
