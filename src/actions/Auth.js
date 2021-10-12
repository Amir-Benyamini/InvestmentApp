import {auth} from '../stores'
import API from '../services/api';

export const login = async (userName, password) => {
	const response = await API.login(userName, password);
	if (response.ok) {
		// auth.login(response.)
	}
}
