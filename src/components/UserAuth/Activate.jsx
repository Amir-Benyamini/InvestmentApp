import React, { useState, useEffect } from "react";
import {activateAccount} from '../../actions/Auth'
import { ToastContainer, toast } from "react-toastify";
import jwt from 'jsonwebtoken'
import Button from '@material-ui/core/Button';
import 'react-toastify/dist/ReactToastify.css';

export function Acivate({ match }) {

	const [values, SetValues] = useState({
		name: '',
		token: '',
		show: true
	});
	
	const { name, token, show } = values

	useEffect(() => {
		let token = match.params.token
		console.log(token)
		let { name } = jwt.decode(token)
		if (token) {
			SetValues({...values, name, token})
		}
	}, [])

	const onAccountActivation = async () => {

		let res = await activateAccount(token)
		if (res.ok) {
			let data = await res.text()
			SetValues({ ...values, show: !show })
			toast.success(JSON.parse(data).messaga)
		}
		if (!res.ok) {
			let data = await res.text()
			toast.error(JSON.parse(data).error)
		}
	};

	const activationLink = () => (
		<div>
			<h1>Hey {name}, please click the "activate account" button to activate your account!</h1>
			<Button onClick={onAccountActivation} variant='contained' size="large" color='primary'>acivate account</Button>
		</div>
	);


	return (
		<div>
			<ToastContainer />
			{activationLink()}
		</div>)
} 