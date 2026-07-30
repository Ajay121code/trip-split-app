const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePasswords(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}

function generateToken(payload) {
  const secretKey = process.env.JWT_SECRET || 'FuqB43RcWup10R7eS6krNhbs1E9BiDAJFqAn5Te2Wcz';
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
}

function verifyToken(token) {
  const secretKey = process.env.JWT_SECRET || 'FuqB43RcWup10R7eS6krNhbs1E9BiDAJFqAn5Te2Wcz';
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
}

module.exports = {
  hashPassword,
  comparePasswords,
  generateToken,
  verifyToken,
};