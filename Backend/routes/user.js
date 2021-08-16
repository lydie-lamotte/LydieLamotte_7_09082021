const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


router.post("/signup", userCtrl.signup); //enregistrer un utilisateur
router.post("/login", userCtrl.login);  //connecter un utilisateur

module.exports = router;