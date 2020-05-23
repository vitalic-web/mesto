const popupEditProfile = document.querySelector('.popup_edit_profile'); // попап редактирования профиля
const popupAddPhoto = document.querySelector('.popup_add_photo'); // попап добавления фотки
const profileEditButton = document.querySelector('.profile__title-button'); // кнопка редактировать профиль
const profileAddPhotoButton = document.querySelector('.profile__add-button'); // кнопка добавить фото
const popupCloseButton = popupEditProfile.querySelector('.popup__close-icon'); //кнопка закрыть окно редактирования профиля
const popupCloseButtonPhoto = popupAddPhoto.querySelector('.popup__close-icon'); //кнопка закрыть окно добавления фотки
const nameInput = popupEditProfile.querySelector('.popup__input_name'); // поле ввода имени
const profInput = popupEditProfile.querySelector('.popup__input_prof'); // поле ввода профессии
const namePhotoInput = popupAddPhoto.querySelector('.popup__input_name'); // поле ввода названия фотки
const linkPhotoInput = popupAddPhoto.querySelector('.popup__input_prof'); // поле ввода ссылки на фотку
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

// цикл на добавление фоток из массива
// добавление/удаление лайков
// удаление фокти нажатием на значок "удалить"

initialCards.forEach(function (item) {
  const photoElement = cloneTemplate(photoTemplate);
  const elementImage = photoElement.querySelector('.element__image');
  const popupElement = photoElement.querySelector('.popup');

  photoElement.querySelector('.element__title-text').textContent = item.name;
  elementImage.src = item.link;

  photoElement.querySelector('.element__title-like').addEventListener('click', function(evt) {
    const eventTargetLike = evt.target; //выбор элемента, на который кликнули
    eventTargetLike.classList.toggle('element__title-like_active');
  })

  photoElement.querySelector('.element__delete').addEventListener('click', function(evt) {
    const eventTargetDelete = evt.target.closest('.element'); //выбор элемента, на который кликнули и ближайшего к нему родителя
    eventTargetDelete.remove();
  })

  elementImage.addEventListener('click', function() { //увеличение фотки

    popupElement.querySelector('.popup-photo__text').textContent = item.name;
    popupElement.querySelector('.popup-photo__image').src = item.link;

    openClose(popupElement);
  })

  photoElement.querySelector('.popup-photo__close').addEventListener('click', function(){ //закрытие фотки по клику
    openClose(popupElement);
  })

  photoContainer.append(photoElement);
})

// функция на создание элемента из шаблона
function cloneTemplate(template) {
  return template.cloneNode(true);
}

// функция открытия/закрытия попап
function openClose(element) {
  element.classList.toggle('popup_active');
}

// функция открытия/закрытия попапа редактирования профиля
function openPopup() {
  openClose(popupEditProfile);

  if (popupEditProfile.classList.contains('popup_active')) {
    nameInput.value = nameOutput.textContent;
    profInput.value = profOutput.textContent;
  }
}

//создаем функцию на открытие/закрытие попапа добавления фотки
//условие if здесь не нужно, т.к. в поле ввода указывается placeholder
function openPopupPhoto() {
  openClose(popupAddPhoto);
}

// создаем функцию для отправки формы редактирования профиля на страницу
// добавляем функцию openPopup для закрытия окна псоле ввода данных
function formSubmitHandler(evt) {
  evt.preventDefault();

  nameOutput.textContent = nameInput.value;
  profOutput.textContent = profInput.value;

  openPopup();
}

// создаем функцию для добавления фотки на страницу
// добавляем функцию openPopup для закрытия окна после ввода данных
// добавление/удаление лайков
// удаление фокти нажатием на значок "удалить"
function formSubmitHandlerPhoto(evt) {
  evt.preventDefault();

  const photoElement = cloneTemplate(photoTemplate);
  const elementImage = photoElement.querySelector('.element__image');
  const popupElement = photoElement.querySelector('.popup');

  photoElement.querySelector('.element__title-text').textContent = namePhotoInput.value;
  elementImage.src = linkPhotoInput.value;

  photoElement.querySelector('.element__title-like').addEventListener('click', function(evt) {
    const eventTargetLike = evt.target; //выбор элемента, на который кликнули
    eventTargetLike.classList.toggle('element__title-like_active');
  })

  photoElement.querySelector('.element__delete').addEventListener('click', function(evt) {
    const eventTargetDelete = evt.target.closest('.element'); //выбор элемента, на который кликнули и ближайшего к нему родителя
    eventTargetDelete.remove();
  })

  elementImage.addEventListener('click', function() { //увеличение фотки

    popupElement.querySelector('.popup-photo__text').textContent = namePhotoInput.value;
    popupElement.querySelector('.popup-photo__image').src = linkPhotoInput.value;

    openClose(popupElement);
  })

  photoElement.querySelector('.popup-photo__close').addEventListener('click', function(){ //закрытие фотки по клику
    openClose(popupElement);
  })

  photoContainer.prepend(photoElement);

  openPopupPhoto();

}

// добавляем событие по клику на открытие/закрытие попапа редактирования профиля
profileEditButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", openPopup);

// добавляем событие по клику на открытие/закрытие попапа добавления фотки
profileAddPhotoButton.addEventListener("click", openPopupPhoto);
popupCloseButtonPhoto.addEventListener("click", openPopupPhoto);

// добавляем событие при клике на "сохранить" в профиле
popupForm.addEventListener('submit', formSubmitHandler);

// добавляем событие при клике на "создать" в дабавлении фотки
popupFormPhoto.addEventListener('submit', formSubmitHandlerPhoto);
