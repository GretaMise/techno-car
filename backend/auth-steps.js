// JWT Autentifikacija

// JWT (Jason Web Token) - tai tekstinis raktas (tokenas), kuri serveris sugeneruoja ir atiduoda vartotojui.
// Tas tokenas saugo informacija (dazniausiai vartotojo id) ir yra pasirasymos specialiu serverio slaptazodziu, kuri laikome .env faile.
// JWT tokena sugeneruot pades jwt.io

// Eiga:

// REGISTRACIJA

// 1. Vartotojas usveda email ir slaptazodi ir spaudzia 'registruotis' mygtuka;
// FRONTEND:
// Siunciame POST request'a i /api/auth/register API
// BACKEND:
// Gaus duomenis, patikrins ar toks email jau egzistuoja, tada kitas zingsnis bus uzkoduoti jo slaptazodi ir sukurti nauja vartotojo duomenu bazeje.
// Mums pades: NPM paketas bcrypt - jis uzkoduos slaptazodi pries issaugojant i duomenu baze.

// server js isimetam : app.use('/api/auth', authRoutes)   ir const authRoutes = require('./routes/authRoutes')
// isiinstaliuojam bcrypt: npm install bcrypt

// happy days. Registracija ivyko

// 2. Sugeneruosim JWT tokena ir atiduosim vartotojui

// isiinstaliuojam npm install jsonwebtoken

// FRONTEND: gaus tokena ir issaugos ji i localStorage
// BACKEND: tokenas bus sugeneruotas naudojant jsonwwebtoken ir vartotojo id.

// LOGIN

// Sukuriame /login API endpoint'a, kuris priims email ir password
// FRONTEND: vartotojas suveda email ir password ir spaudzia prisijungti mygtuka
// BACKEND: gaus duomenis, patikrins ar suvesti email ir password, tada patikrins duomenu bazeje ar toks vartotojas egzistuoja.
// Jei egzistuoja - patiksinsime suvesta slaptazodi su bcrypt.compare() f-ja. Jei slaptazodziai sutampa -
// sugeneruosim JWT tokena (access tokenas) ir atiduosim vartotojui.
