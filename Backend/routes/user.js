const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');



//enregistrer un utilisateur
router.post("/signup", userCtrl.signUp);

//connecter un utilisateur
router.post("/login", userCtrl.login);

//supprimer un utilisateur
router.delete("/:id", userCtrl.deleteUser);

//modifier un utilisateur
router.put('/:id', userCtrl.updateUser);

module.exports = router;