const popup = document.querySelectorAll('.popup'); //оба попапа в массив
const profileEditButton = document.querySelector('.profile__title-button'); // кнопка редактировать профиль
const profileAddPhotoButton = document.querySelector('.profile__add-button'); // кнопка добавить фото
const popupCloseButton = popup[0].querySelector('.popup__close-icon'); //кнопка закрыть окно!!! НАДО ЛИ ДВЕ КНОПКИ?
const popupCloseButtonPhoto = popup[1].querySelector('.popup__close-icon'); //кнопка закрыть окно!!!! НАДО ЛИ ДВЕ КНОПКИ?
const nameInput = popup[0].querySelector('.popup__input_name'); // поле ввода имени
const profInput = popup[0].querySelector('.popup__input_prof'); // поле ввода профессии
const namePhotoInput = popup[1].querySelector('.popup__input_name'); // поле ввода названия фотки
const linkPhotoInput = popup[1].querySelector('.popup__input_prof'); // поле ввода ссылки на фотку
const nameOutput = document.querySelector('.profile__title-name'); // имя на странице
const profOutput = document.querySelector('.profile__subtitle'); // профессия на странице
const visiblePopup = popup[0]; // окно попапа редактирования профиля с затемняющим фоном
const visiblePopupPhoto = popup[1]; // окно попапа добавления фотки с затемняющим фоном
const popupForm = popup[0].querySelector('.popup__container'); // окно попапа редактирования
const popupFormPhoto = popup[1].querySelector('.popup__container'); // окно попапа добавления фотки
const photoContainer = document.querySelector('.elements'); // контейнер всех фоток
// const photoElements = document.querySelectorAll('.element'); // все элементы с фотками в массив
const photoTemplate = document.querySelector('#element-template').content; // шаблон на добавление элементов
const photoOpenTemplate = document.querySelector('#open-photo').content; //шаблон на открытие фотографии
const content = document.querySelector('.content');

// let photoElements = [];

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
for (let i = 0; i < initialCards.length; i++) {
  const photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.element__title-text').textContent = initialCards[i].name;
  photoElement.querySelector('.element__image').src = initialCards[i].link;

  photoElement.querySelector('.element__title-like').addEventListener('click', function(evt) {
    const eventTargetLike = evt.target; //выбор элемента, на который кликнули
    eventTargetLike.classList.toggle('element__title-like_active');
  })

  photoElement.querySelector('.element__delete').addEventListener('click', function(evt) {
    const eventTargetDelete = evt.target.closest('.element'); //выбор элемента, на который кликнули и ближайшего к нему родителя
    eventTargetDelete.remove();
  })

  photoElement.querySelector('.element__image').addEventListener('click', function() { //увеличение фотки

    const photoOpen = photoOpenTemplate.cloneNode(true);
    photoOpen.querySelector('.popup-photo__text').textContent = initialCards[i].name;
    photoOpen.querySelector('.popup-photo__image').src = initialCards[i].link;

    photoOpen.querySelector('.popup-photo__close').addEventListener('click', function(evt){ //закрытие фотки по клику
      const eventPhotoClose = evt.target.closest('.popup');
      eventPhotoClose.remove();
    })
    content.append(photoOpen);
  })

  photoContainer.append(photoElement);
}

function openPopup() {
  visiblePopup.classList.toggle('popup_active');

  if (visiblePopup.classList.contains('popup_active')) {
    nameInput.value = nameOutput.textContent;
    profInput.value = profOutput.textContent;
  }
}

//создаем функцию на открытие/закрытие попапа добавления фотки
//условие if здесь не нужно, т.к. в поле ввода указывается placeholder
function openPopupPhoto() {
  visiblePopupPhoto.classList.toggle('popup_active');
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

  const photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.element__title-text').textContent = namePhotoInput.value;
  photoElement.querySelector('.element__image').src = linkPhotoInput.value;

  photoElement.querySelector('.element__title-like').addEventListener('click', function(evt) {
    const eventTargetLike = evt.target; //выбор элемента, на который кликнули
    eventTargetLike.classList.toggle('element__title-like_active');
  })

  photoElement.querySelector('.element__delete').addEventListener('click', function(evt) {
    const eventTargetDelete = evt.target.closest('.element'); //выбор элемента, на который кликнули и ближайшего к нему родителя
    eventTargetDelete.remove();
  })

  photoElement.querySelector('.element__image').addEventListener('click', function() { //увеличение фотки

    const photoOpen = photoOpenTemplate.cloneNode(true);
    photoOpen.querySelector('.popup-photo__text').textContent = namePhotoInput.value;
    photoOpen.querySelector('.popup-photo__image').src = linkPhotoInput.value;


    photoOpen.querySelector('.popup-photo__close').addEventListener('click', function(evt){ //закрытие фотки по клику
      const eventPhotoClose = evt.target.closest('.popup');
      eventPhotoClose.remove();
    })
    content.append(photoOpen);
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
