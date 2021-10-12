import { observable, makeObservable, action } from 'mobx'

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
