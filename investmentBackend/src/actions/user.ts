import User from './../db/user';

export const read = (req: { params: { id: string; }; }, res: any) => {
	const userId = req.params.id
	User.findById(userId).exec((err: any, user: any) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'User not found'
			})
		}
		user.hashed_password = undefined
		user.salt = undefined
		res.json(user)
	})
}

export const update = (req: any, res: any) => {
	// console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body)
	const { name, password } = req.body
	User.findById(req.user._id, (err: any, user: any) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'User not found'
			})
		}
		if (!name && !password) {
			return res.status(400).json({
				error: 'Name and password is required'
			})
		} if (name) {
			user.name = name
		}
		if (password) {
			if (password.length < 6) {
				return res.status(400).json({
					error: 'Password should be at least 6 characters'
				})
			} else {
				user.password = password
			}
		}
		user.save((err: any, updatedUser: any) => {
			if (err) {
				console.log('User update error', err)
				return res.status(400).json({
					error: 'User update failed'
				})
			}
			updatedUser.hashed_password = undefined
			updatedUser.salt = undefined
			res.json(updatedUser)
		})
	})
}