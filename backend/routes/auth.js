const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model.js');


// const JWT_SECRET = verysecretstring
// const JWT_EXPIRY = 1d


const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!roles.includes(decoded.role)) return res.status(403).json({ message: 'Forbidden' });
      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!['student', 'recruiter', 'institute'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, password: hashed, role });
    res.status(201).json({ message: 'Registered' });
  } catch {
    res.status(400).json({ message: 'Email already exists' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });
  const token = generateToken(user);
  res.json({ token });
});

router.post('/logout', (req, res) => {
    // Client Code
  res.status(200).json({ message: 'Logged out' });
});

// Role Only Routes
router.get('/student', auth(['student']), (req, res) => res.send('Hello Student'));
router.get('/recruiter', auth(['recruiter']), (req, res) => res.send('Hello Recruiter'));

module.exports = router;
