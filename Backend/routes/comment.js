const express = require('express');//importe express
const router = express.Router();//crée express

const auth = require('../middleware/auth');


const commentCtrl = require('../controllers/comment');

router.get('/', auth, commentCtrl.findAllComment);
router.post('/newCmt', auth, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.findOneComment);
router.put('/modifyCmt/:id', auth, commentCtrl.modifyComment);
router.delete('/deleteCmt/:id', auth, commentCtrl.deleteComment);

module.exports = router;