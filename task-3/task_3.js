const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.json());

mongoose.connect('mongodb+srv://twinklevpopat20:admin@cluster0.96uk5gh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Define a User schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Define a User model
const User = mongoose.model('User', UserSchema);

// Create a new user
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  const user = new User({ name, email, age });
  user.save()
    .then(() => res.send('User created successfully'))
    .catch((err) => res.status(400).send(err));
});

// Get all users
app.get('/users', (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err));
});

// Get a user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    })
    .catch((err) => res.status(400).send(err));
});



// Start the server
app.listen(8000, () => console.log('Server started'));
