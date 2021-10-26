import React from "react";
import { facebookLogin } from '../../actions/Auth';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Button from '@material-ui/core/Button';
import 'react-toastify/dist/ReactToastify.css';
import FacebookIcon from '@mui/icons-material/Facebook';

export const FacebookAuth = ({informParent}) => {

	const responseFacebook = async (res) => {
		console.log(res)
		let apiRes = await facebookLogin(res.userID, res.accessToken)
		let data = await apiRes.json()
		if (apiRes.ok) {
			console.log('FACEBOOK LOGIN SUCCESS!', data)
			informParent(data)
		}
		if (!apiRes.ok) {

		}
	};

	return (
		<div>
			<FacebookLogin
				appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
				autoLoad={false}
				callback={responseFacebook}
				render={renderProps => (
					<Button
						variant="outlined"
						color="primary"
						onClick={renderProps.onClick}
						startIcon={<FacebookIcon />}
					>Login With Facebook</Button>
				)} />
		</div>
	)
}