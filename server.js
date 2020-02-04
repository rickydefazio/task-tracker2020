const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const tasks = require('./routes/api/tasks');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

// Create express app
const app = express();

// Parse incoming requests with JSON
app.use(express.json());

// DB Config
const uri = config.get('mongoURI');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(err => console.log(err));

// Routes
app.use('/api/tasks', tasks);
app.use('/api/users', users);
app.use('/api/auth', auth);

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
