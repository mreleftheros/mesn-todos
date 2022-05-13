require('dotenv').config();
const { connect } = require('./lib/db');
const app = require('./app');

const port = process.env.PORT || 5000;

connect()
  .then(() => {
    console.log('Database connection established.');
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
