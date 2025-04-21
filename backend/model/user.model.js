// model/user.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows null/undefined values (for wallet-only users)
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: function() {
      // Password is required only if no wallet address
      return !this.walletAddress;
    }
  },
  role: {
    type: String,
    enum: ['student', 'recruiter', 'institute', 'admin'],
    default: 'student'
  },
  walletAddress: {
    type: String,
    unique: true,
    sparse: true, // Allows null/undefined for email users
    lowercase: true
  },
  nonce: {
    type: String,
    default: function() {
      // Generate random nonce for wallet authentication
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
  },
  profile: {
    name: String,
    avatar: String,
    bio: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate a new nonce after each successful authentication
userSchema.methods.generateNonce = function() {
  this.nonce = Math.floor(100000 + Math.random() * 900000).toString();
  return this.save();
};

module.exports = mongoose.model('User', userSchema);