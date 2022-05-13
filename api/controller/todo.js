const Todo = require('../model/Todo');

exports.index_get = async (req, res) => {
  try {
    const result = await Todo.getAll();

    return res.json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.index_post = async (req, res) => {
  try {
    const { text } = Todo.format(req.body.text);

    const { errors, isValid } = Todo.validate(text);
    if (!isValid) {
      return res.status(400).json({ ...errors, error: 'Validation failed.' });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};
