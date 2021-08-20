const express = require('express');//importe express
const router = express.Router();//crée express

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.findAllPost);
router.post('/newPost', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.findOnePost);
router.put('/modifyPost/:id', auth, multer, postCtrl.modifyPost);
router.delete('/deletePost/:id', auth, postCtrl.deletePost);

module.exports = router;