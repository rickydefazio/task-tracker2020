const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const tasks = require('./routes/api/tasks');

const app = express();

app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Mongo Options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to Mongo
mongoose
  .connect(db, options)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/tasks', tasks);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
