//authentication routes
const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
	//validate responses from user
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//Check if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send('Email already exists');

	//Hash passwords with bcryptjs
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	//Create new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		// password: req.body.password
		password: hashPassword
	});
	try {
		const savedUser = await user.save();
		// res.send(savedUser);
		res.send({ user: user.id });
	} catch (err) {
		res.status(400).send(err);
	}
});

//Login
router.post('/login', async (req, res) => {
	//validate responses from user
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//Check if email doesn't exist
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Email is not found');

	//Check if password is correct
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid password');

	//JWT create and assign token
	//if password is valid, send a response
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send(token);

	// res.send('Logged in!');
});

module.exports = router;
