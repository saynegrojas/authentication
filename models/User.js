const mongoose = require('mongoose');

//Create schema for user properties to be filled out
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);
