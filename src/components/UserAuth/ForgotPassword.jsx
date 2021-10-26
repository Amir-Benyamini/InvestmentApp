import React, { useState } from "react";
import {forgotPassword} from '../../actions/Auth'
import { ToastContainer, toast } from "react-toastify";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'react-toastify/dist/ReactToastify.css';


export const ForgotPassword = () => {

	const [values, setValues] = useState({
		email: '',
		buttonText: 'Submit'
	});
	const { email, buttonText } = values

	const updateLoginInput = (value, name) => {
		const updatedValues = { ...values }
		updatedValues[name] = value
		setValues(updatedValues)
	};

	const onFormSubmit = async (event) => {
		event.preventDefault()
		setValues({ ...values, buttonText: 'Submitting...' })

		let res = await forgotPassword(email)
		let data = await res.json()

		if (res.ok) {
				toast.success(data.message)
				setValues({ ...values, email: '', password: '', buttonText: 'Submited' })
			
		}
		if (!res.ok) {
			setValues({ ...values, email: '', password: '', buttonText: 'Submit' })
			toast.error(data.error)
		}
	};

	const forgotPasswordForm = () => (
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

				<Button onClick={onFormSubmit} variant='contained' size="large" color='primary'>{buttonText}</Button>
			</FormControl>
		</form>
	);

	return (
		<div>
			<ToastContainer />
			<h1>Enter Your Email To Reset Password</h1>
			{forgotPasswordForm()}
		</div>)
}