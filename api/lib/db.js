const { MongoClient, ObjectId } = require('mongodb');

const _dbName = 'main';
const _client = new MongoClient(process.env.DB);

module.exports = {
  async connect() {
    return await _client.connect();
  },
  getCol(collection) {
    return _client.db(_dbName).collection(collection);
  },
  getId(id) {
    return ObjectId(id);
  },
};
