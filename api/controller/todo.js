const Todo = require('../model/Todo');

exports.index_get = async (req, res) => {
  try {
    const { _id } = req.user;

    const result = await Todo.getAllByUser(_id);

    return res.json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.index_post = async (req, res) => {
  try {
    const { error, errors, data } = Todo.validate(req.body);
    if (error) {
      return res.status(400).json({ error, ...errors });
    }

    const { text } = data;

    const result = await Todo.set(text, req.user._id);

    return res.status(201).json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.idParam_get = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Todo.getById(id);
    if (!result) {
      return res.status(404).json({ error: 'Todo not found.' });
    }
    if (result.userId !== req.user._id) {
      return res.status(403).json({ error: 'Forbidden.' });
    }

    return res.json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.idParam_put = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Todo.getById(id);
    if (!result) {
      return res.status(404).json({ error: 'Todo not found.' });
    }
    if (result.userId !== req.user._id) {
      return res.status(403).json({ error: 'Forbidden.' });
    }

    const { error, errors, data } = Todo.validate(req.body);
    if (error) {
      return res.status(400).json({ error, ...errors });
    }

    if ('isDone' in data) {
      if (result.isDone && data.isDone) {
        return res.status(400).json({ error: 'Todo already done.' });
      } else if (!result.isDone && !data.isDone) {
        return res.status(400).json({ error: 'Todo already undone.' });
      }
    }

    await Todo.update(id, data);

    return res.json({ ...result, ...data });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.idParam_delete = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Todo.getById(id);
    if (!result) {
      return res.status(404).json({ error: 'Todo not found.' });
    }
    if (result.userId !== req.user._id) {
      return res.status(403).json({ error: 'Forbidden.' });
    }

    await Todo.deleteById(id);

    return res.json(true);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};
