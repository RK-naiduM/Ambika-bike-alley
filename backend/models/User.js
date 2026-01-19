const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// --- METHOD: Check if entered password matches DB hash ---
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// --- MIDDLEWARE: Encrypt password before saving ---
// MODERN FIX: We remove 'next' from the parameters entirely
userSchema.pre('save', async function () {
  // 1. If password is NOT modified, we just exit the function immediately.
  if (!this.isModified('password')) {
    return;
  }

  // 2. Otherwise, we hash the password.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  // No need to call next() - the async function finishing is the signal to continue.
});

const User = mongoose.model('User', userSchema);

module.exports = User;