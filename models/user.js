const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		//unique: true
		userName: {
			type: String,
			required: true,
			//if this email is already used, it won't be created bc every email is unique
			unique: true,
		},
		//hashed password results(to cover actual password)
		password: {
			type: String,
			required: true,
		},
		//not required
		//can start off without a token, then save one later
		token: String,
	},
	{
		timestamps: true,
		// when i call a to json(same as .json)
		//anytime the doc get vhanged to json using a proper json method 
		//and running whats inside
		//
		toJSON: {
			transform: (_doc, user) => {
				//delete removes a key from an object
				//rmeoving the hash password
				delete user.password
				return user
			},
		},
	}
)

module.exports = mongoose.model('User', userSchema)