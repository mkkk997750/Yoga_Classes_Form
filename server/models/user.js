// models/user.js: This is the file that defines the User model

// Import the mongoose module:
const mongoose = require('mongoose');

// Define the user schemaa
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export the User model
module.exports = User = mongoose.model('user', UserSchema);
