import {auth} from '../stores'
import API from '../services/api';


export const login = async (email,  password) => {
	const response = await API.login(email, password);

	if (response.ok) {
		console.log('lOGIN SUCCESS!', response)
		// auth.login(response.)
	}

	return response
};

export const signup = async (name, email,  password) => {
	const response = await API.signup(name, email,  password);

	if (response.ok) {
		console.log('SIGNUP SUCCESS!', response)
		// auth.login(response.)
	}

	return response
};
