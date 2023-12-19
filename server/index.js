// const express = require("express");

// const PORT = process.env.PORT || 3001;

// const app = express();

// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
//   });

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });


// const express = require("express");
// const db = require('./db');
// const cors = require('cors');

// const PORT = process.env.PORT || 3001;

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.post('/api/enroll', (req, res) => {
//     // Get the user data from the request body
//     const { name, email, age, batch, month } = req.body;
  
//     // Validate the user data
//     if (!name || !email || !age || !batch || !month) {
//       return res.status(400).json({ message: 'Please fill all the fields' });
//     }
  
//     if (age < 18 || age > 65) {
//       return res.status(400).json({ message: 'Age limit is 18-65' });
//     }
  
//     // Check if the user already exists in the database
//     db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         if (result.length > 0) {
//           // User already exists, return an error
//           return res.status(400).json({ message: 'User already exists' });
//         } else {
//           // User does not exist, insert the user data into the database
//           db.query(
//             'INSERT INTO users (name, email, age, batch, month, payment_status) VALUES (?,?,?,?,?,?)',
//             [name, email, age, batch, month, 'pending'],
//             (err, result) => {
//               if (err) {
//                 console.log(err);
//               } else {
//                 // User data inserted successfully, return a success message
//                 return res.status(200).json({ message: 'User enrolled successfully' });
//               }
//             }
//           );
//         }
//       }
//     });
//   });
  
//   // Route for getting the user data by their email
//   app.get('/api/user/:email', (req, res) => {
//     // Get the email from the request params
//     const email = req.params.email;
  
//     // Query the database for the user data by their email
//     db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         if (result.length > 0) {
//           // User data found, return the user data
//           return res.status(200).json(result[0]);
//         } else {
//           // User data not found, return an error
//           return res.status(404).json({ message: 'User not found' });
//         }
//       }
//     });
//   });
  
//   // Route for updating the user data and changing their batch
//   app.put('/api/user/:email', (req, res) => {
//     // Get the email from the request params
//     const email = req.params.email;
  
//     // Get the updated user data from the request body
//     const { name, age, batch, month } = req.body;
  
//     // Validate the updated user data
//     if (!name || !age || !batch || !month) {
//       return res.status(400).json({ message: 'Please fill all the fields' });
//     }
  
//     if (age < 18 || age > 65) {
//       return res.status(400).json({ message: 'Age limit is 18-65' });
//     }
  
//     // Query the database to update the user data by their email
//     db.query(
//       'UPDATE users SET name = ?, age = ?, batch = ?, month = ? WHERE email = ?',
//       [name, age, batch, month, email],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           // User data updated successfully, return a success message
//           return res.status(200).json({ message: 'User updated successfully' });
//         }
//       }
//     );
//   });
  
//   // Route for processing the payment using the CompletePayment() function
//   app.post('/api/payment/:email', (req, res) => {
//     // Get the email from the request params
//     const email = req.params.email;
  
//     // Get the payment details from the request body
//     const { cardNumber, expiryDate, cvv, amount } = req.body;
  
//     // Validate the payment details
//     if (!cardNumber || !expiryDate || !cvv || !amount) {
//       return res.status(400).json({ message: 'Please fill all the fields' });
//     }
  
//     // Call the CompletePayment() function with the payment details
//     CompletePayment(cardNumber, expiryDate, cvv, amount, (err, result) => {
//       if (err) {
//         // Payment failed, return an error
//         return res.status(400).json({ message: 'Payment failed' });
//       } else {
//         // Payment succeeded, update the payment status in the database
//         db.query(
//           'UPDATE users SET payment_status = ? WHERE email = ?',
//           ['paid', email],
//           (err, result) => {
//             if (err) {
//               console.log(err);
//             } else {
//               // Payment status updated successfully, return a success message
//               return res.status(200).json({ message: 'Payment successful' });
//             }
//           }
//         );
//       }
//     });
//   });

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });



const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const request = require('request');

const app = express();
// mongodb://0.0.0.0:27017/yoga
// mongodb+srv://tropnicates:BQZ7PIxJHKdroqex@fullstack-blog-project.otgvrqz.mongodb.net/?retryWrites=true&w=majority
// Connect to MongoDB database
mongoose.connect('mongodb://0.0.0.0:27017/yoga_classes', { useNewUrlParser: true,  useUnifiedTopology: true
// useFindAndModify: false 
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define the user schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  batch: String,
  payment: Boolean
});

const User = mongoose.model('User', userSchema);

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      batch,
      payment: false
    });

    // Save the user to the database
    await user.save();

    // Generate a token for the user
    const token = jwt.sign({ id: user._id }, 'secret');

    // Send the token and user data to the front-end
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        batch: user.batch,
        payment: user.payment
      }
    });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Define the login endpoint
app.post('/api/login', async (req, res) => {
  try {
    // Validate the user input
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Verify the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a token for the user
    const token = jwt.sign({ id: user._id }, 'secret');

    // Send the token and user data to the front-end
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        batch: user.batch,
        payment: user.payment
      }
    });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Define the pay endpoint:
app.post('/api/pay', async (req, res) => {
    try {
      // Validate the user input
      const { token, method, amount } = req.body;
      if (!token || !method || !amount) {
        return res.status(400).json({ message: 'Please fill all the fields' });
      }
      if (!['card', 'paypal', 'upi'].includes(method)) {
        return res.status(400).json({ message: 'Invalid payment method' });
      }
      if (amount !== 500) {
        return res.status(400).json({ message: 'Invalid payment amount' });
      }
  
      // Verify the token
      const decoded = jwt.verify(token, 'secret');
      if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Find the user by id
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Call the CompletePayment() function with the user and payment details
      const paymentResult = await CompletePayment(user, method, amount);
  
      // Handle the payment response
      if (paymentResult.success) {
        // Update the user's payment status in the database
        user.payment = true;
        await user.save();
  
        // Send a success message to the front-end
        res.json({ message: 'Payment successful' });
      } else {
        // Send an error message to the front-end
        res.status(400).json({ message: 'Payment failed' });
      }
    } catch (err) {
      // Handle any errors
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Start the server on port 3000
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
  

