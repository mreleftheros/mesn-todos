const jwt = require('jsonwebtoken');

const seconds = 24 * 60 * 60;

exports.createToken = (...data) =>
  jwt.sign({ ...data }, process.env.JWT, {
    expiresIn: seconds,
  });

exports.cookieOpts = () => ({
  maxAge: seconds * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Lax',
});
