const express = require('express');
const cors = require('cors');
const config = require('./helpers/config.json');
// const jwt = require('./helpers/jwt');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
// app.use(jwt());

const uri = config.connectionString;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
