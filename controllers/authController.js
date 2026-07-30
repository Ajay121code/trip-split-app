const {hashPassword, comparePasswords, generateToken, verifyToken} = require('../services/authService');
const {connectDB, getDB} = require('../db/connection');

async function register(req, res) {
  const db = getDB();
  const { name, email, password } = req.body;

  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  const passwordHash = await hashPassword(password);

  const result = await db.collection('users').insertOne({
    name,
    email,
    passwordHash
  });

  const token = generateToken(result.insertedId);

  res.status(201).json({ token, userId: result.insertedId });
}