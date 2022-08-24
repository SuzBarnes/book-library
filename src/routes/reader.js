const express = require('express');
const readerController = require('../controllers/reader');

const router = express.Router();

router.route('/').post(readerController.create);
router.route('/').get(readerController.read);

router.route('/:readerId').get(readerController.readById);
router.route('/:readerId').patch(readerController.update);
router.route('/:readerId').delete(readerController.delete);


module.exports = router;