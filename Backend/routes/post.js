const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');
const post = require('../models/post');

router.get('/', auth, postCtrl.findAllPost);
router.post('/newPost', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.findOnePost);
router.put('/modifyPost/:id', auth, multer, postCtrl.modifyPost);
router.delete('/deletePost/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likePost);

module.exports = router;