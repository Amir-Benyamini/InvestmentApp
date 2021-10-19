import { observable, makeObservable, action } from 'mobx'
import { isAuth } from '.././services/authHelpers'
export class Authentication {

	constructor() {
		this.isLoggedIn = false
		this.token = undefined

		makeObservable(this, {
			isLoggedIn: observable,
			login: action
		})
	}

	login(token) {
		this.token = token
		this.isLoggedIn = true
	}

	logout() {
		this.token = undefined
		this.isLoggedIn = false
	}

}
