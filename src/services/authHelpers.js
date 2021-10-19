import cookie from 'js-cookie'

//set in cookie
export const setCookie = (key, value) => {
	if (window !== undefined) {
		cookie.set(key, value, { expires: 30 })
	}
}
//remove from cookie
export const removeCookie = (key) => {
	if (window !== undefined) {
		cookie.remove(key)
	}
}
//get token from cookie (will be usefull when we will need to make a request to server with token)
export const getCookie = (key) => {
	if (window !== undefined) {
		return cookie.get(key)
	}
}
//set in local storage
export const setLocalStorage = (key, value) => {
	if (window !== undefined) {
		localStorage.setItem(key, JSON.stringify(value))
	}
}
//remove from local storage
export const removeLocalStorage = (key) => {
	if (window !== undefined) {
		localStorage.removeItem(key)
	}
}
//authenticate user by passing data to cookie and local storage during login
export const authenticate = (res, cb) => {
	setCookie('token', res.token)
	setLocalStorage('user', res.user)
	cb()
}
//access user info from local storage
export const isAuth = () => {
	if (window !== undefined) {
		const cookieChecked = getCookie('token')
		if (cookieChecked) {
			if (localStorage.getItem('user')) {
				return JSON.parse(localStorage.getItem('user'))
			} else {
				return false
			}
		}
	}
};