require('dotenv').config();

const express = require('express');
const routerApi = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const conn = process.env.DATABASE_URL;

const { checkApiKey } = require('./middlewares/auth-handler');
const { errorHandler, boomErrorHandler } = require('./middlewares/error-handler');
const cookieParser = require('cookie-parser');

mongoose.connect(conn);

const database = mongoose.connection;

database.on('error', (error) => {
	console.log(error);
});

database.once('connected', () => {
	console.log('Database connected');
})

const app = express();
const port = 3000;

require('./utils/auth');

const whitelist = ["http://localhost:3000", "http://localhost:5173"];

const options = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials:true
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(options));

app.get('/', (req, res) => {
	res.send('Welcome to Pet Log API');
});

routerApi(app);

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);