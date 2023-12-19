const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'yoga',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Define the user schema and model
const userSchema = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  batch VARCHAR(10) NOT NULL,
  payment BOOLEAN NOT NULL DEFAULT 0
)`;

// Initialize the database schema
pool.query(userSchema, (err) => {
  if (err) throw err;
  console.log('Users table created or already exists');
});

// Define the register endpoint
app.post('/api/register', async (req, res) => {
  try {
    // Validate the user input
    const { name, email, password, age, batch } = req.body;
    if (!name || !email || !password || !age || !batch) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }
    if (age < 18 || age > 65) {
      return res.status(400).json({ message: 'Age limit is 18-65' });
    }
    if (!['6-7AM', '7-8AM', '8-9AM', '5-6PM'].includes(batch)) {
      return res.status(400).json({ message: 'Invalid batch' });
    }

    // Check if the user already exists
    const [existingUser] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      age,
      batch,
      payment: false,
    };

    // Save the user to the database
    const [result] = await pool.promise().query('INSERT INTO users SET ?', [newUser]);

    // Generate a token for the user
    const token = jwt.sign({ id: result.insertId }, 'secret');

    // Send the token and user data to the front-end
    res.json({
      token,
      user: {
        id: result.insertId,
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
        batch: newUser.batch,
        payment: newUser.payment,
      },
    });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ... (similar modifications for login and pay endpoints)

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});