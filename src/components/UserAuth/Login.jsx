import React, { useState } from "react";
import { login } from '../../actions/Auth'
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'react-toastify/dist/ReactToastify.css';

export function Login() {

	const [values, SetValues] = useState({
		email: '',
		password: '',
		buttonText: 'Submit'
	});
	const { email, password, buttonText } = values

	const updateLoginInput = (value, name) => {
		const updatedValues = { ...values }
		updatedValues[name] = value
		SetValues(updatedValues)
	};

	const onFormSubmit = async (event) => {
		event.preventDefault()
		SetValues({ ...values, buttonText: 'Submitting...' })

		let res = await login(email, password)

		if (res.ok) {
			//safve the res(user/token) on local storage/coockie
			let data = await res.text()
			SetValues({ ...values, email: '', password: '', buttonText: 'Submited' })
			toast.success(`Welcome ${JSON.parse(data).user.name}`)
		}
		if (!res.ok) {
			let data = await res.text()
			SetValues({ ...values, email: '', password: '', buttonText: 'Submit' })
			toast.error(JSON.parse(data).error)
		}


	};

	const loginForm = () => (
		<form>
			<FormControl >

				<TextField
					required
					variant='outlined'
					id='email'
					name='email'
					type='text'
					label='Email'
					value={email}
					onChange={(e) => updateLoginInput(e.target.value, e.target.name)}
				/>

				<TextField
					required
					variant='outlined'
					id='password'
					name='password'
					type='text'
					label='Password'
					value={password}
					onChange={(e) => updateLoginInput(e.target.value, e.target.name)}
				/>
				<Button onClick={onFormSubmit} variant='contained' size="large" color='primary'>{buttonText}</Button>
			</FormControl>
		</form>
	);

	return (
		<div>
			<ToastContainer />
			<h1>Login</h1>
			{loginForm()}
		</div>)
} 