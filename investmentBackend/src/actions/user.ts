import User from './../db/user';

export const read = (req: { params: { id: string; }; }, res: any) => {
	const userId = req.params.id
	User.findById(userId).exec((err: any, user: any) => {
		if(err || !user){
			return res.status(400).json({
				error: 'User not found'
			})
		}
		user.hashed_password = undefined
		user.salt = undefined
		res.json(user)
	})
}