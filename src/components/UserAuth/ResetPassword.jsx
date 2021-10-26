import React, { useState, useEffect } from "react";
import { resetPassword } from '../../actions/Auth'
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from "react-toastify";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'react-toastify/dist/ReactToastify.css';


export const ResetPassword = ({match}) => {

	const [values, setValues] = useState({
		name: '',
		token: '',
		newPassword: '',
		buttonText: 'Reset Password'
	});
	

	useEffect(() => {
		let token = match.params.token
		const { name } = jwt.decode(token)
		if (token) {
			setValues({ ...values, name, token })
		}

	}, [])

	const {name, token, newPassword, buttonText } = values

	const updateLoginInput = (value, name) => {
		const updatedValues = { ...values }
		updatedValues[name] = value
		setValues(updatedValues)
	};
	const resetForm = (buttonText) => {
		setValues({ ...values, newPassword: '', buttonText })
	};

	const onFormSubmit = async (event) => {
		event.preventDefault()
		setValues({ ...values, buttonText: 'Resetting...' })

		let res = await resetPassword(newPassword, token)
		let data = await res.json()

		if (res.ok) {
			resetForm('Reset Password')
			toast.success(data.message)


		}
		if (!res.ok) {
			resetForm('Submit')
			toast.error(data.error)
		}
	};

	const resetPasswordForm = () => (
		<form>
			<FormControl >

				<TextField
					required
					variant='outlined'
					id='password'
					name='newPassword'
					type='text'
					label='Password'
					value={newPassword}
					onChange={(e) => updateLoginInput(e.target.value, e.target.name)}
				/>

				<Button onClick={onFormSubmit} variant='contained' size="large" color='primary'>{buttonText}</Button>
			</FormControl>
		</form>
	);

	return (
		<div>
			<ToastContainer />
			<h1>{`Hey ${name}, please Reset Password.`}</h1>
			{resetPasswordForm()}
		</div>)
}