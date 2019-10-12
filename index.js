const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//Routes sets to auth.js
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

//connect to mongodb
//store mongodb password to .env
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
	console.log(`connected to mongodb.`);
});

//Middleware
//To read post create a body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Route middleware
//Routes in auth.js will have to go through /api/user
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
