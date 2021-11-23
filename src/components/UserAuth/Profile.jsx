import React, { useState, useEffect } from "react";
import { updateProfile } from '../../actions/Auth'
import { ToastContainer, toast } from "react-toastify"
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { isAuth, getCookie, updateUser } from '../../services/authHelpers'
import {loadProfile} from '../../actions/Auth'
import 'react-toastify/dist/ReactToastify.css';

export function Profile() {

	const [form, setForm] = useState({
		name: '',
		password: '',
		buttonText: 'Update',
	});

	const [values, setValues] = useState({
		name: '',
		email: '',
		role: ''
	});

	const token = getCookie('token')
	const { name, email, role } = values

	useEffect(async () => {
		let res = await loadProfile(isAuth()._id, token)
		let data = await res.text()

		if (res.ok) {
			console.log('Profile updated', res)
			const { role, email, name } = JSON.parse(data)
			setValues({ ...values, role, email, name })
		}
		if (!res.ok) {
			console.log('Profile update error', JSON.parse(data).error)
			return JSON.parse(data).error
		}

	}, [])

	

	const updateFormInput = (value, name) => {
		setForm({ ...form, [name]: value })
	};

	const resetForm = () => {
		setForm({ name: '', password: '', buttonText: 'Update' })
	}

	const setButtonText = (buttonText) => {
		setForm({ ...form, buttonText })
	}

	const onFormSubmit = async (event) => {
		event.preventDefault()
		setButtonText('Updating..')

		let res = await updateProfile(form.name, form.password, token)
		let data = await res.json()

		if (res.ok) {
			setValues({ ...values, ...form })
			updateUser(data, () => {
				resetForm()
				toast.success(`Profile updated successfully!`)
			} )
		}
		if (!res.ok) {
			resetForm()
			toast.error(data.error)
		}
	};

	const updateProfileForm = () => (
		<form>
			<FormControl >

				<TextField
					variant='outlined'
					id='name'
					name='name'
					type='text'
					label='Updated Name'
					value={form.name}
					onChange={(e) => updateFormInput(e.target.value, e.target.name)}
				/>

				<TextField
					variant='outlined'
					id='password'
					name='password'
					type='text'
					label='Updated Password'
					value={form.password}
					onChange={(e) => updateFormInput(e.target.value, e.target.name)}
				/>
				<Button onClick={onFormSubmit} variant='contained' size="large" color='primary'>{form.buttonText}</Button>
			</FormControl>
		</form>
	);

	return (
		<div>
			<ToastContainer />
			<h1>Profile Page</h1>
			<hr />
			<h4>name:{name}</h4>
			<h4>Role:{role}</h4>
			<h4>Email:{email}</h4>
			<hr />
			<h3>profile update form</h3>
			{updateProfileForm()}
		</div>)
} 