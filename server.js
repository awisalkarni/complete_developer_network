const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')


require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// app.use(cors());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(express.json());

const uri = process.env.MONGODB_URI || 'mongodb://localhost/cdn'
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const skillsetRouter = require('./routes/skillsets');
const hobbyRouter = require('./routes/hobbies');

app.use('/api/users', usersRouter);
app.use('/api/skillsets', skillsetRouter);
app.use('/api/hobbies', hobbyRouter);



// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
