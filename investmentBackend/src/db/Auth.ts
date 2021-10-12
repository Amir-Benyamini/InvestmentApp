import mongoose from 'mongoose';

const Schema = mongoose.Schema

const authSchema = new Schema({
	 type: { type: String, required: true }, // google, facebook, password
	 password: { type: String, required: false },
	 token: { type: String, required: false },
	 fullName: { type: String, required: false },
	 email: { type: String, required: false },
	 platformID: {type: String, required: false}
})

const Auth = mongoose.model("Auth", authSchema)

export default Auth