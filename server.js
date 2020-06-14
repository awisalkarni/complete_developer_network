const express = require('express');
const cors = require('cors');
const config = require('./helpers/config.json');
// const jwt = require('./helpers/jwt');
const mongoose = require('mongoose');
const path = require('path')


require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(express.json());
// app.use(jwt());




const uri = process.env.MONGODB_URI || 'mongodb://localhost/cdn'
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');

app.use('/api/users', usersRouter);



// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
