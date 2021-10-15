"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.accountActivation = exports.signup = void 0;
const user_1 = __importDefault(require("./../db/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_1 = require("../services/email");
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
const signup = (req, res) => {
    const { name, email, password } = req.body;
    user_1.default.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: "email is taken!"
            });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '15m' });
            const emailData = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'Account activation link',
                html: `<h1>Please use the following link to activate your account</h1> 
				 <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
				 <hr />
				 <p>This email may contain sensetive information.</p>
				 <p>${process.env.CLIENT_URL}</p>`
            };
            (0, email_1.sendEmailWithNodemailer)(req, res, emailData);
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
exports.signup = signup;
const accountActivation = (req, res) => {
    const { token } = req.body;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (err, decoded) {
            if (err) {
                console.log('JWT ACCOUNT ACTIVATION ERROR', err);
                return res.status(401).json({
                    error: 'Expierd link. Please signup again.'
                });
            }
            // @ts-ignore
            const { name, email, password } = jsonwebtoken_1.default.decode(token);
            const user = new user_1.default({ name, email, password });
            user.save((err, user) => {
                if (err) {
                    console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
                    return res.status(401).json({
                        error: 'Error saving user in DB. Try signup again.'
                    });
                }
                return res.json({
                    messaga: 'Signup success! Please signin.'
                });
            });
        });
    }
    else {
        return res.json({
            messaga: 'Something went wrong. Please try again.'
        });
    }
};
exports.accountActivation = accountActivation;
const login = (req, res) => {
    const { email, password } = req.body;
    user_1.default.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Incorrect password. Please try again.'
            });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id, }, process.env.JWT_SECRET, { expiresIn: '30d' });
        const { _id, name, email, role } = user;
        return res.json({
            token,
            user: { _id, name, email, role }
        });
    });
};
exports.login = login;
