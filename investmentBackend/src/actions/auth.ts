import User from './../db/user';
import jwt from 'jsonwebtoken'
import { sendEmailWithNodemailer } from '../services/email'

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
			return res
		}
	})

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
	sendEmailWithNodemailer(req, res, emailData);

	// sgMail.send(emailData).then(() => {
	// 	return res.json({
	// 		message: `Email has sent to ${email}. Follow the instruction to activate your account.`
	// 	}).catch((error: { response: { body: any; }; }) => {
	// 		console.log(error.response.body)
	// 		// console.log(error.response.body.errors[0].message)
	//   })
	// })

}

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
						error: 'Error saveing user in DB. Try signup again.'
					})
				}
				return res.json({
					messaga: 'Signup success! Please signin.'
				})
			});

		});
	} else {
		return res.json({
			messaga: 'Something went wrong. Please try again.'
		})
	}
};