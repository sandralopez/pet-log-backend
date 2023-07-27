require('dotenv').config();

const express = require('express');
const routerApi = require('./routes');
const mongoose = require('mongoose');
const conn = process.env.DATABASE_URL;

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

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Pet Log API');
});

routerApi(app);

app.listen(port);