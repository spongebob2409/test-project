const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const crypto = require('crypto');  // Adjusted: Added import
const nodemailer = require('nodemailer');  // Adjusted: Added import

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/teaching', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Adjusted: Fixed route paths (removed dots)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password == password) {
          res.json("success")
        } else {
          res.json("the password is incorrect")
        }
      }
    })
    .catch(err => res.json(err));
});

app.post('/register', (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// Adjusted: Added routes for password recovery
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

app.post('/reset-password', (req, res) => {
  const { email } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const token = crypto.randomBytes(32).toString('hex');
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
      user.save();

      transporter.sendMail({
        to: email,
        from: 'your-email@gmail.com',
        subject: 'Password Reset',
        html: `<p>You requested a password reset</p>
               <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>`
      });

      res.status(200).json({ message: 'Password reset email sent' });
    })
    .catch(err => res.status(500).json({ message: 'Server error' }));
});

app.post('/new-password', (req, res) => {
  const { token, newPassword } = req.body;
  UserModel.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() }
  })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: 'Token invalid or expired' });
      }
      user.password = newPassword;  // Adjusted: No bcrypt for simplicity
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      user.save();
      res.status(200).json({ message: 'Password updated successfully' });
    })
    .catch(err => res.status(500).json({ message: 'Server error' }));
});

app.listen(3001, () => {
  console.log("server is running")
});
