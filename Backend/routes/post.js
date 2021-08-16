const express = require('express');//importe express
const router = express.Router();//crée express

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getAllPost);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.post('/:id/like', auth, postCtrl.likePost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;