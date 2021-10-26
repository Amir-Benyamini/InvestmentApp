import React, { useState, useEffect } from "react";
import { Redirect, Link as L } from 'react-router-dom'
import { login } from '../../actions/Auth';
import { authenticate, isAuth } from '../../services/authHelpers'
import { ToastContainer, toast } from "react-toastify";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAuth } from '../UserAuth/GoogleAuth'
import { FacebookAuth } from '../UserAuth/FacebookAuth'


export const Login = () => {

	const [values, setValues] = useState({
		email: '',
		password: '',
		buttonText: 'Submit',
		auth: false
	});
	const { email, password, buttonText, auth } = values
	useEffect(() => {

	}, [auth])

	const updateLoginInput = (value, name) => {
		const updatedValues = { ...values }
		updatedValues[name] = value
		setValues(updatedValues)
	};

	const informParent = (res) => {
		authenticate(res, () => {
			console.log('LOGIN SUCCESS!', res)
			setValues({...values, auth: !auth})
		})
	}
	const onFormSubmit = async (event) => {
		event.preventDefault()
		setValues({ ...values, buttonText: 'Submitting...' })

		let res = await login(email, password)
		let data = await res.text()

		if (res.ok) {
			//save the res(user/token) on local storage/coockie
			authenticate(JSON.parse(data), () => {
				console.log('LOGIN SUCCESS!', JSON.parse(data))
				toast.success(`Welcome ${JSON.parse(data).user.name}`)
				setValues({ ...values, email: '', password: '', buttonText: 'Submited' })
			})
		}
		if (!res.ok) {
			setValues({ ...values, email: '', password: '', buttonText: 'Submit' })
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
				<Link
					to='/auth/password/forgot'
					component="button"
					variant="body2"
				>
					<L to='/auth/password/forgot'>forgot password</L>
				</Link>
			</FormControl>
		</form>
	);

	return (
		<div>
			<ToastContainer />
			{isAuth() ? <Redirect to='/' /> : null}
			<h1>Login</h1>
			<GoogleAuth informParent={informParent} />
			<FacebookAuth informParent={informParent} />
			{loginForm()}
		</div>)
}