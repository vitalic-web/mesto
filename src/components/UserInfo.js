export class UserInfo {
  constructor(userName, userProf) {
    this._userName = document.querySelector(userName);
    this._userProf = document.querySelector(userProf);
  }

  getUserInfo() {
    this._infoList = {
      name: this._userName.textContent,
      prof: this._userProf.textContent
    }

    return this._infoList;
  }

  setUserInfo(inputList) {
    this._userName.textContent = inputList.name;
    this._userProf.textContent = inputList.about; //about
  }
}
