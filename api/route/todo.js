const { index_get, index_post } = require('../controller/todo');
const router = require('express').Router();

router.get('/', index_get);
router.post('/', index_post);

module.exports = router;
