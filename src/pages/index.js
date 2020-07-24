import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithDelete } from '../components/PopupWithDelete.js';
import {
  popupEditProfile,
  popupAddPhoto,
  profileEditButton,
  profileAddPhotoButton,
  nameInput,
  profInput,
  namePhotoInput,
  linkPhotoInput,
  templateSelector,
  validationSetup,
  profileAvatarEditor,
  popupEditAvatar,
  avatarLinkInput,
  avatarImage
} from '../utils/constants.js';

// экземпляры классов для валидации на каждый попап
const validationPopupAddPhoto = new FormValidator(popupAddPhoto, validationSetup);
const validationPopupEditProfile = new FormValidator(popupEditProfile, validationSetup);
const validationPopupEditAvatar = new FormValidator(popupEditAvatar, validationSetup);

// экземпляр класса для открытия изображения в полную величину
const cardImage = new PopupWithImage('.popup_open_photo', '.popup-photo__text', '.popup-photo__image');

// создание API для работы с сервером
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-13',
  method: 'GET',
  headers: {
    authorization: '91300657-0053-4635-a6b2-461fc085116c',
    'Content-Type': 'application/json'
  }
});

function generateCardFromTemplate(cardItem) {

  const deletePopup = new PopupWithDelete('.popup_is_delete', {
    handleDelete: () => {
      api.deleteCard(cardItem)
      .then(() => cardElement.remove())
      .catch(err => Promise.reject(err.message))
    }
  });

  const card = new Card(templateSelector, cardItem,
    {
      handleCardClick: () => {
        cardImage.open(cardItem.name, cardItem.link);
      },
      handleLikeOn: () => { // передача колбэком добавления лайка
        api.addLike(cardItem)
          .then(() => {
            card.addLike();
            card.addLikeAmount();
          })
          .catch(err => Promise.reject(err.message))
      },
      handleLikeOff: () => { // передача колбэком удаления лайка
        api.removeLike(cardItem)
          .then(() => {
            card.removeLike();
            card.removeLikeAmount();
          })
          .catch(err => Promise.reject(err.message))
      },
      errorPopupOpen: () => { // передача колбэком в слушатель кнопки удаления открытие попап подтверждения
        deletePopup.open();
      },
      deleteCard: () => { // передача колбэком слушателей на кнопку удаления
        deletePopup.setEventListeners();
      }
    }
  )

  const cardElement = card.generateCard();

  cardItem.likes.forEach(item => { // проверка карточек на наличие и отображение моих лайков
    if (item._id === 'ea044bafde876847d478303e') {
      card.addLike();
    }
  })

  return cardElement;
}

// выгрузка карточек с сервера на страницу
api.getInitialCards().then(result => {

  const cardList = new Section({
    items: result,
    renderer: (cardItem) => { // создание карточки с данными с сервера
      const cardElement = generateCardFromTemplate(cardItem);

      // проверка карточек - если мои, то добавление кнопки "удалить", если нет, то кнопка "удалить" скрывается
      if (!(cardItem.owner._id === 'ea044bafde876847d478303e')) {
        cardElement.querySelector('.element__delete').classList.add('element__delete_hidden');
      }

      cardImage.setEventListeners();
      cardList.addItem(cardElement);
    }
  }, '.elements');

  cardList.renderItems();

  const formPhoto = new PopupWithForm(
    '.popup_add_photo',
    {
      handleFormSubmit: (inputValues) => {
        formPhoto.saveUX('Сохранение...');
        api.addCard(inputValues)
          .then((res) => {
            formPhoto.saveUX('Создать');
            const cardElement = generateCardFromTemplate(res);

            cardImage.setEventListeners();
            cardList.addItem(cardElement);
          }
          )
      }
    })

  formPhoto.setEventListeners();

  profileAddPhotoButton.addEventListener('click', () => {
    formPhoto.open();

    validationPopupAddPhoto.clearError(namePhotoInput);
    validationPopupAddPhoto.clearError(linkPhotoInput);
  })

})
.catch(err => Promise.reject(err.message))

// выгрузка данных профиля с сервера
api.getProfileInfo().then(data => {
  userProfileInfo.setUserInfo(data);
  avatarImage.src = data.avatar;
})
.catch(err => Promise.reject(err.message))

// экземпляр класса с информацией о пользователе
const userProfileInfo = new UserInfo('.profile__title-name', '.profile__subtitle');

// попап формы редактирования профиля
const formUser = new PopupWithForm(
  '.popup_edit_profile',
  {
    handleFormSubmit: (inputValues) => {
      formUser.saveUX('Сохранение...');
      api.setProfileInfo(inputValues)
        .then(() => {
          formUser.saveUX('Сохранить');
          userProfileInfo.setUserInfo(inputValues);
        })
        .catch(err => Promise.reject(err.message))
    }
  }
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

// попап редактирования аватара
const formAvatar = new PopupWithForm('.popup_edit_avatar', {
  handleFormSubmit: (inputValues) => {
    formAvatar.saveUX('Сохранение...');
    api.editAvatar(inputValues)
      .then((res) => {
        formAvatar.saveUX('Сохранить');
        avatarImage.src = res.avatar;
      })
      .catch(err => Promise.reject(err.message))
  }
});

formAvatar.setEventListeners();

// слушатель на кнопку редактирования аватара
profileAvatarEditor.addEventListener('click', () => {
  formAvatar.open();

  validationPopupEditAvatar.clearError(avatarLinkInput);
})

// добавление валидации на всю страницу
validationPopupAddPhoto.enableValidation();
validationPopupEditProfile.enableValidation();
validationPopupEditAvatar.enableValidation();

