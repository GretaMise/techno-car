const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. patikriname ar visi laukai uzpildyti
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // 2. patikriname ar email egzituoja musu duomenu bazeje
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // 3. Sukuriame nauja vartotoja
    const user = new User({
      name,
      email,
      password,
    });

    user.save();

    // 4. sugeneruojame jwt tokena

    // id - vartotojo id, kuri leis mums atpazinti, kuris user'is kreipiasi i serveri
    // JWT_SECRET - serverio slaptazodis, kad niekas negaletu padirbti tokeno
    // expiresIn - laikas, po kurio tokenas bus nebegaliojantis
    // TOKENAS NERA SAUGOMAS DUOMENU BAZEJE, JIS YRA ATIDUODAMAS NAUDOTOJUI!!!!
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res
      .status(201)
      .json({ access_token: token, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

//login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. patikriname ar visi laukai uzpildyti
    if (!email || !password) {
      return res.json({ error: 'All fields are required' });
    }

    // 2. patikriname ar useris egzistuoha musu duomenu bazeje
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // 3. patikriname ar slaptazodis sutampa su duoemnu bazeje esanciu slaptazodziu
    // grazins true/false
    const isPasswordValid = await existingUser.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email and/or password' });
    }

    // 4. jei viskas gerai, tai sugeneruojam nauja tokena
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    );

    // 5. Atiduodame tokena vartotojui
    res
      .status(201)
      .json({ access_token: token, message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    // 1. issitraukiam tokena is request headerio
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // 2. tikriname ar tokenas egzistuoja
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

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
