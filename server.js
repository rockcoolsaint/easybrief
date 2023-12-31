const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const config = require('config');

//const items = require('./routes/api/items');

const app = express();
dotenv.config();

// Bodyparser Middleware
app.use(express.json());

// DB Config
// const db = require('./config/keys').mongoURI;
const connection_url = config.get('mongoURI');
// const db = process.env.NODE_ENV == 'development' ? "mongodb://localhost/mern_shopping" : connection_url;
const db = process.env.CONNECTION_URL;

// Connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

// Use Routes
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

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