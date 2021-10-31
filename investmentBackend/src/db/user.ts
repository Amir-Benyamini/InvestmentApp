import mongoose from 'mongoose';
import { PlanSchema } from './plan';
import crypto from 'crypto'

//userSchema
const Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		max: 32
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	hashed_password: {
		type: String,
		required: true,
	},
	salt: String,
	role: {
		type: String,
		default: 'subscriber',
	},
	plans: [PlanSchema],
	resetPasswordLink: {
		data: String,
		default: '',
	}
}, { timestamps: true })

//virtual
userSchema.virtual('password')
	.set(function (this: any, password: string) {
		this._password = password
		this.salt = this.makeSalt() // i dont want to save salt in DB.
		this.hashed_password = this.encryptPassword(password)
	})
	.get(function (this: any) {
		return this._password
	})
//methods
userSchema.methods = {
	authenticate: function (this: any, password: string) {
		return this.encryptPassword(password) === this.hashed_password;

	},
	encryptPassword: function (this: any, password) {
		if (!password) return ''
		try {
			return crypto
				.createHmac('sha1', this.salt)
				.update(password)
				.digest('hex');
		} catch (err) { return '' }
	},
	makeSalt: function () {
		const num = Math.round(new Date().valueOf() * Math.random())
		const string = num.toString()
		return string
	}
}
const User = mongoose.model("User", userSchema)

export default User