const jwt = require('jsonwebtoken');
const User = require('../model/User');

exports.protect = async (req, res, next) => {
  const token = req.cookies['access-token'];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT);

      const result = await User.getById(decoded['0']);
      if (!result) {
        return res.status(404).json({ error: 'No user found.' });
      }

      req.user = result;
      return next();
    } catch (err) {
      return res.status(401).json({ err: 'Unauthorized. Invalid token.' });
    }
  } else {
    return res.status(400).json({ error: 'No token.' });
  }

  return next();
};
