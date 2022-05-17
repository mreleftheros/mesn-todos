const router = require('express').Router();
const {
  index_get,
  index_post,
  idParam_get,
  idParam_put,
  idParam_delete,
} = require('../controller/todo');
const { protect } = require('../middlware/auth');

router.get('/', protect, index_get);
router.post('/', protect, index_post);
router.get('/:id', protect, idParam_get);
router.put('/:id', protect, idParam_put);
router.delete('/:id', protect, idParam_delete);

module.exports = router;
