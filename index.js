require('dotenv').config();

const express = require('express');
const routerApi = require('./routes');
const mongoose = require('mongoose');
const conn = process.env.DATABASE_URL;

const { checkApiKey } = require('./middlewares/auth-handler');
const { errorHandler, boomErrorHandler } = require('./middlewares/error-handler');

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

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome to Pet Log API');
});

routerApi(app);

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);