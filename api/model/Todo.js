const { getCol } = require('../lib/db');
const col = getCol('todo');

class Todo {
  static format(text) {
    if (typeof text !== 'string') {
      text = '';
    }

    return { text: text.trim() };
  }

  static validate(text) {
    const errors = {};

    if (!text) {
      errors.textError = 'Must provide text.';
    } else if (text.length < 4 || text.length > 30) {
      errors.textError = 'Text must be between 4-30 characters.';
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  }

  static async getAll() {
    return await col.find().toArray();
  }
}

module.exports = Todo;
