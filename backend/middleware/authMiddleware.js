const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    // 1. issitraukiam tokena is headerio
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // 3. tikriname ar tokenas yra validus (pvz. ar nepasibaiges galiojimas)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. issitraukiam user'io duomenis is duomenu bazes
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // jei viskas okm tai pridedame useri prie request objekto
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = authMiddleware;
