const popupEditProfile = document.querySelector('.popup_edit_profile'); // попап редактирования профиля
const popupAddPhoto = document.querySelector('.popup_add_photo'); // попап добавления фотки
const popupOpenPhoto = document.querySelector('.popup_open_photo'); // попап открытия фотки
const profileEditButton = document.querySelector('.profile__title-button'); // кнопка редактировать профиль
const profileAddPhotoButton = document.querySelector('.profile__add-button'); // кнопка добавить фото
const popupCloseButton = popupEditProfile.querySelector('.popup__close-icon'); //кнопка закрыть окно редактирования профиля
const popupCloseButtonPhoto = popupAddPhoto.querySelector('.popup__close-icon'); //кнопка закрыть окно добавления фотки
const nameInput = popupEditProfile.querySelector('.popup__input_filed_name'); // поле ввода имени
const profInput = popupEditProfile.querySelector('.popup__input_filed_prof'); // поле ввода профессии
const namePhotoInput = popupAddPhoto.querySelector('.popup__input_filed_name'); // поле ввода названия фотки
const linkPhotoInput = popupAddPhoto.querySelector('.popup__input_filed_prof'); // поле ввода ссылки на фотку
const nameOutput = document.querySelector('.profile__title-name'); // имя на странице
const profOutput = document.querySelector('.profile__subtitle'); // профессия на странице
const popupForm = popupEditProfile.querySelector('.popup__container'); // окно попапа редактирования
const popupFormPhoto = popupAddPhoto.querySelector('.popup__container'); // окно попапа добавления фотки
const photoContainer = document.querySelector('.elements'); // контейнер всех фоток
const photoTemplate = document.querySelector('#element-template').content; // шаблон на добавление элементов

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
  const inputList = Array.from(popupEditProfile.querySelectorAll('.popup__input'));
  const saveButton = popupEditProfile.querySelector('.popup__save-button');

  if (popupEditProfile.classList.contains('popup_active')) {
    nameInput.value = nameOutput.textContent;
    profInput.value = profOutput.textContent;
    toggleButtonState(inputList, saveButton, validationSetup.inactiveButtonClass, 'popup__save-button_inactive');
  }
}

// функция для отправки формы редактирования профиля на страницу
function formEditProfile(evt) {
  evt.preventDefault();

  nameOutput.textContent = nameInput.value;
  profOutput.textContent = profInput.value;

  openEditProfile();
}

// функция на добавление фоток из шаблона
// добавление/удаление лайков
// удаление фотки нажатием на значок "удалить"
// увеличение фотки по клику на нее
function addElement(element, name, link) {
  const elementImage = element.querySelector('.element__image');

  element.querySelector('.element__title-text').textContent = name;
  elementImage.src = link;
  elementImage.alt = name;

  element.querySelector('.element__title-like').addEventListener('click', function(evt) { // лайки
    const eventTargetLike = evt.target; //выбор элемента, на который кликнули
    eventTargetLike.classList.toggle('element__title-like_active');
  })

  element.querySelector('.element__delete').addEventListener('click', function(evt) { // удаление фотки
    const eventTargetDelete = evt.target.closest('.element'); //выбор элемента, на который кликнули и ближайшего к нему родителя
    eventTargetDelete.remove();
  })

  elementImage.addEventListener('click', function() { //увеличение фотки

    popupOpenPhoto.querySelector('.popup-photo__text').textContent = name;
    popupOpenPhoto.querySelector('.popup-photo__image').src = link;

    togglePopup(popupOpenPhoto);
  })
}

// цикл на добавление на страницу фоток из массива
initialCards.forEach(function (item) {
  const photoElement = photoTemplate.cloneNode(true);
  const photoName = item.name;
  const photoLink = item.link;

  addElement(photoElement, photoName, photoLink);
  photoContainer.append(photoElement);
})

// функция для добавления фотки на страницу
function formAddPhoto(evt) {
  evt.preventDefault();

  const addedPhotoElement = photoTemplate.cloneNode(true);
  const addedPhotoName = namePhotoInput.value;
  const addedPhotoLink = linkPhotoInput.value;

  addElement(addedPhotoElement, addedPhotoName, addedPhotoLink);
  photoContainer.prepend(addedPhotoElement);
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
