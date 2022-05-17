const User = require('../model/User');
const { createToken, cookieOpts } = require('../utils/auth');

exports.signup_post = async (req, res) => {
  try {
    const { errors, error, data } = User.validate(req.body);
    if (error) {
      return res.status(400).json({ error, ...errors });
    }

    const { username, password } = data;

    const result = await User.check(username);
    if (result) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    const { _id } = await User.signup(username, password);

    const token = createToken(_id, username);

    res.cookie('access-token', token, cookieOpts);

    return res.status(201).json({ _id, username, token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.login_post = async (req, res) => {
  try {
    const { error, errors, data } = User.validate(req.body);
    if (error) {
      return res.status(400).json({ error, ...errors });
    }

    const { username, password } = req.body;

    const result = await User.login(username, password);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    const token = createToken(result._id, username);

    res.cookie('access-token', token, cookieOpts);

    return res.json({ _id: result._id, username, token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.me_get = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return res.json(req.user);
};

exports.logout_get = async (req, res) => {
  try {
    res.clearCookie('access-token');
    return res.json(true);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};
