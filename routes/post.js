const router = require('express').Router();
const auth = require('./verifyToken');

router.get('/', auth, (req, res) => {
	// res.json({
	// posts: {
	// 	title: 'my first post',
	// 	description: 'random data you shouldnt access'
	// }
	res.send(req.user);
	// User.findbyone({ _id: req.user });
	// });
});

module.exports = router;
