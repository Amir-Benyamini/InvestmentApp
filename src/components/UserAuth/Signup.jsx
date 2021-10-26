import React, { useState } from "react";
import { signup } from '../../actions/Auth'
import { ToastContainer, toast } from "react-toastify"
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'react-toastify/dist/ReactToastify.css';


export function Signup() {

	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		buttonText: 'Submit'
	});
	const { name, email, password, buttonText } = values

	const updateSignupInput = (value, name) => {
		const updatedValues = { ...values }
		updatedValues[name] = value
		setValues(updatedValues)
	};

	const onFormSubmit = async (event) => {
		event.preventDefault()
		setValues({ ...values, buttonText: 'Submitting...' })

		let res = await signup(name, email, password)
		let data = await res.text()

		if (res.ok) {
			setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submited' })
			toast.success(JSON.parse(data).message)
		}
		if (!res.ok) {
			setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submit' })
			toast.error(JSON.parse(data).error)
		}


	};

	const signupForm = () => (
		<form>
			<FormControl >
				<TextField
					required
					variant='outlined'
					id='name'
					name='name'
					type='text'
					label='User Name'
					value={name}
					onChange={(e) => updateSignupInput(e.target.value, e.target.name)}
				/>

				<TextField
					required
					variant='outlined'
					id='email'
					name='email'
					type='text'
					label='Email'
					value={email}
					onChange={(e) => updateSignupInput(e.target.value, e.target.name)}
				/>

				<TextField
					required
					variant='outlined'
					id='password'
					name='password'
					type='text'
					label='Password'
					value={password}
					onChange={(e) => updateSignupInput(e.target.value, e.target.name)}
				/>
				<Button onClick={onFormSubmit} variant='contained' size="large" color='primary'>{buttonText}</Button>
			</FormControl>
		</form>
	);

	return (
		<div>
			<ToastContainer />
			<h1>Signup</h1>
			{signupForm()}
		</div>)
} 