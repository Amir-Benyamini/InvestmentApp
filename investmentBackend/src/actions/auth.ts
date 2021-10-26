import User from './../db/user';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { sendEmailWithNodemailer } from '../services/email'
import _ from 'lodash'
import { OAuth2Client } from 'google-auth-library'
// import fetch from 'node-fetch'
import axios from 'axios'
axios.defaults

// export const signup = (req: { body: { name: string; email: string; password: string; }; }, res: any) => {
// 	// console.log('REQ BODY ON SIGNUP', req.body);
// 	const { name, email, password } = req.body

// 	User.findOne({ email }).exec((err: any, user: any) => {
// 		if (user) {
// 			return res
// 		}
// 	})

// 	let newUser = new User({ name, email, password })
// 	newUser.save((err: any, success: any) => {
// 		if (err) {
// 			console.log('SIGNUP ERROR', err)
// 			return res.status(400).json({
// 				error: err
// 			})
// 		}
// 		res.json({
// 			message: 'Signup success! Please signin'
// 		})
// 	})
// };

export const signup = (req: any, res: any) => {
	const { name, email, password } = req.body

	User.findOne({ email }).exec((err: any, user: any) => {
		if (user) {
			return res.status(400).json({
				error: "email is taken!"
			})
		} else {
			const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION!, { expiresIn: '15m' })

			const emailData = {
				from: process.env.EMAIL_FROM!,
				to: email,
				subject: 'Account activation link',
				html:
					`<h1>Please use the following link to activate your account</h1> 
				 <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
				 <hr />
				 <p>This email may contain sensetive information.</p>
				 <p>${process.env.CLIENT_URL}</p>`
			}
			sendEmailWithNodemailer(req, res, emailData)
		}
	});

	// .then(() => {
	// 		return res.json({
	// 			message: `Email has sent to ${email}. Follow the instruction to activate your account.`
	// 		}).catch((error: { response: { body: any; }; }) => {
	// 			console.log(error.response.body)
	// 			console.log(error.response.body.errors[0].message)
	// 	  })
	// 	});

	// sgMail.send(emailData).then(() => {
	// 	return res.json({
	// 		message: `Email has sent to ${email}. Follow the instruction to activate your account.`
	// 	}).catch((error: { response: { body: any; }; }) => {
	// 		console.log(error.response.body)
	// 		// console.log(error.response.body.errors[0].message)
	//   })
	// })
};

export const accountActivation = (req: any, res: any) => {
	const { token } = req.body

	if (token) {
		jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION!, function (err: any, decoded: any) {
			if (err) {
				console.log('JWT ACCOUNT ACTIVATION ERROR', err);
				return res.status(401).json({
					error: 'Expierd link. Please signup again.'
				})
			}
			// @ts-ignore
			const { name, email, password } = jwt.decode(token);

			const user = new User({ name, email, password });

			user.save((err: any, user: any) => {
				if (err) {
					console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err)
					return res.status(401).json({
						error: 'Error saving user in DB. Try signup again.'
					})
				}
				return res.json({
					messaga: 'Signup success! Please login.'
				})
			});

		});
	} else {
		return res.json({
			messaga: 'Something went wrong. Please try again.'
		})
	}
};

export const login = (req: any, res: any) => {
	const { email, password } = req.body
	User.findOne({ email }).exec((err: any, user: { authenticate?: any; _id: any; name?: any; email?: any; role?: any; }) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'User with that email does not exist. Please signup'
			})
		}
		if (!user.authenticate(password)) {
			return res.status(400).json({
				error: 'Incorrect password. Please try again.'
			})
		}
		const token = jwt.sign({ _id: user._id, }, process.env.JWT_SECRET!, { expiresIn: '30d' })
		const { _id, name, email, role } = user

		return res.json({
			token,
			user: { _id, name, email, role }
		})
	});


};

// @ts-ignore
export const requireLogin = expressJwt({
	secret: process.env.JWT_SECRET!,
	algorithms: ['HS256']
});


export const forgotPassword = (req: any, res: any) => {
	const { email } = req.body
	User.findOne({ email }).exec((err: any, user: any) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'User with that email does not exist. Please try again'
			})
		}
		const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_RESET_PASSWORD!, { expiresIn: '15m' })

		const emailData = {
			from: process.env.EMAIL_FROM!,
			to: email,
			subject: 'Password reset link',
			html:
				`<h1>Please use the following link to reset your password</h1> 
				 <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
				 <hr />
				 <p>This email may contain sensetive information.</p>
				 <p>${process.env.CLIENT_URL}</p>`
		}
		return User.updateOne({ resetPasswordLink: token }, (err: any, success: any) => {
			if (err) {
				console.log('REXSET PASSWORD LINK ERROR', err)
				return res.status(400).json({
					error: 'DB connection error on user forgot password'
				})
			} else {
				sendEmailWithNodemailer(req, res, emailData)
			}
		})
	})
};


export const resetPassword = (req: any, res: any) => {
	const { resetPasswordLink, newPassword } = req.body
	if (resetPasswordLink) {
		jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD!, function (err: any, decoded: any) {
			if (err) {
				return res.status(400).json({
					error: 'Expired link, try again.'
				})
			}
			User.findOne({ resetPasswordLink }, (err: any, user: any) => {
				if (err || !user) {
					return res.status(400).json({
						error: 'Somthing went wrong, try again'
					})
				}
				const updatedFields = {
					password: newPassword,
					resetPasswordLink: ''
				}
				user = _.extend(user, updatedFields)
				user.save((err: any, result: any) => {
					if (err) {
						return res.status(400).json({
							error: 'Error reseting user password!'
						})
					}
					res.json({
						message: 'Great! now you can login with your new password.'
					})
				})
			})
		})
	}
};


export const googleLogin = async (req: any, res: any) => {
	const client = new OAuth2Client(process.env.GOOGLE_CLIENT)
	const { idToken } = req.body
	let response = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT! })
	console.log('GOOGLE LOGIN RESPONSE', response)
	// @ts-ignore
	const { email_verified, name, email } = response.payload
	if (email_verified) {
		User.findOne({ email }).exec((err: any, user: any) => {
			if (user) {
				const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '30D' })
				const { _id, name, email, role } = user
				return res.json({
					token,
					user: { _id, name, email, role }
				})
			} else {
				let password = email + process.env.JWT_SECRET!
				user = new User({ name, email, password })
				user.save((err: any, data: { _id: any; name?: any; email?: any; role?: any; }) => {
					if (err) {
						console.log('ERROR GOOGLE LOGIN ON USER SAVE', err)
						return res.status(400).json({
							error: 'User faild to save on google login.'
						})
					}
					const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET!, { expiresIn: '30D' })
					const { _id, name, email, role } = data
					return res.json({
						token,
						user: { _id, name, email, role }
					})
				})
			}
		})
	} else {
		return res.status(400).json({
			error: 'Google login faild, Please try again.'
		})
	}
};

export const facebookLogin = async (req: any, res: any) => {
	console.log('FACEBOOK LOGIN REQ BODY', req.body)
	const { userID, accessToken } = req.body
	const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
	

	let userProfile = await axios.get(url)
	let userData = userProfile.data
	if (userProfile) {
		// @ts-ignore
		const { email, name } = userData
		User.findOne({ email }).exec((err: any, user: any) => {
			if (user) {
				const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '30D' })
				const { _id, name, email, role } = user
				return res.json({
					token,
					user: { _id, name, email, role }
				})
			} else {
				let password = email + process.env.JWT_SECRET!
				user = new User({ name, email, password })
				user.save((err: any, data: { _id: any; name?: any; email?: any; role?: any; }) => {
					if (err) {
						console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err)
						return res.status(400).json({
							error: 'User faild to save on facebook login.'
						})
					}
					const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET!, { expiresIn: '30D' })
					const { _id, name, email, role } = data
					return res.json({
						token,
						user: { _id, name, email, role }
					})
				})
			}
		})
	} else {
		res.json({
			error: 'Facebook login failed, Please try again.'
		})
	}
};