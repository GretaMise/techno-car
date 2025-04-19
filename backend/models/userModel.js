const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      // unikalus email, kuris dar nera panaudotas
      unique: true,
      trim: true,
      // jei netycia issaugotu didziaja raide, tai kad issaugotu mazaja, nes visi emailai yra is mazuju.
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// pries issaugojant slaptazodi, ji uzkoduojame su bscrypt ir paverciame i hash'a
userSchema.pre('save', async function (next) {
  // jei slaptazodis nebuvo keistas, tai tiesiog einame toliau ir neskaitome kodo is sios funkcijos
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // uzkoduojame slaptazodi su bcrypt
    // salt - papildomas slaptazodis, kuri sugenereuoja ant virsaus egzistuojancio slaptazodzio
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// tikriame ar slaptazodis sutampa su MongoDB ir zmogaus ivestu

userSchema.methods.comparePassword = async function (password) {
  // bcrypt.compare() - palygina du slaptazodzius
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
