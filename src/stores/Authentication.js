import { observable, makeObservable, action } from "mobx";
import { isAuth } from "../services/authHelpers";
export class Authentication {
  constructor() {
    this.isLoggedIn = false;

    makeObservable(this, {
      isLoggedIn: observable,
      authenticate: action,
    });
  }

  authenticate() {
    if (isAuth()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
