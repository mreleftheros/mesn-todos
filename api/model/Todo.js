const { getCol, getId } = require('../lib/db');
const col = getCol('todo');

class Todo {
  static validate(data) {
    const errors = {};
    let error = '';
    const len = Object.keys(data).length;

    if (len === 1) {
      if (!('text' in data) && !('isDone' in data)) {
        error = 'Invalid data.';
      }
    } else if (len === 2) {
      if (!('text' in data) || !('isDone' in data)) {
        error = 'Invalid data.';
      }
    } else if (len > 2) {
      error = 'Invalid data.';
    }

    label: if ('text' in data) {
      if (typeof data.text !== 'string') {
        errors.textError = 'Invalid input.';
        break label;
      }

      data.text.trim();
      const { text } = data;

      if (!text) {
        errors.textError = 'Must provide text.';
      } else if (text.length < 4 || text.length > 30) {
        errors.textError = 'Text must be between 4-30 characters.';
      }
    }

    if ('isDone' in data) {
      const { isDone } = data;

      if (typeof isDone !== 'boolean') {
        errors.isDoneError = 'Invalid input.';
      }
    }

    if (Object.keys(errors).length > 0 && !error) {
      error = 'Validation failed.';
    }

    return {
      data,
      errors,
      error,
    };
  }

  static async getAll() {
    return await col.find().toArray();
  }

  static async getAllByUser(userId) {
    return await col.find({ userId }).toArray();
  }

  static async set(text, userId) {
    const isDone = false;

    const { insertedId, acknowledged } = await col.insertOne({
      text,
      isDone,
      userId,
    });

    if (!acknowledged) throw new Error('Could not save todo in the database.');

    return {
      _id: insertedId.toString(),
      text,
      isDone,
      userId,
    };
  }

  static async getById(id) {
    return await col.findOne({ _id: getId(id) });
  }

  static async update(id, data) {
    return await col.updateOne({ _id: getId(id) }, { $set: { ...data } });
  }

  static async deleteById(id) {
    return await col.deleteOne({ _id: getId(id) });
  }
}

module.exports = Todo;
