export class FormValidator {
  constructor(formElement, formSetup) {
    this._formElement = formElement; //'.popup__container'
    this._formSetup = formSetup;
  }

  _showInputError(element) { //показ ошибки
    const errorElement = this._formElement.querySelector(`#${element.id}-error`);

    element.classList.add(this._formSetup.inputErrorClass); //'popup__input_error'
    errorElement.textContent = element.validationMessage;
  }

  _hideInputError(element) { //скрытие ошибки
    const errorElement = this._formElement.querySelector(`#${element.id}-error`);

    element.classList.remove(this._formSetup.inputErrorClass); //'popup__input_error'
    errorElement.textContent = '';
  }

  _hasInvalidInput() { // проверка всех инпутов формы
    const inputList = Array.from(this._formElement.querySelectorAll(this._formSetup.inputSelector));

    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() { //блокировка кнопки при ошибке
    const submitButton = this._formElement.querySelector(this._formSetup.submitButtonSelector);

    if (this._hasInvalidInput()) {
      submitButton.classList.add(this._formSetup.inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._formSetup.inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _isValid(element) {
    if (!element.validity.valid) {
      this._showInputError(element);
    } else this._hideInputError(element);
  }

  enableValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._formSetup.inputSelector)); //'.popup__input'

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      })
    })
  }

  clearError(inputElement) {
    this._hideInputError(inputElement);
    this._toggleButtonState();
  }

}
