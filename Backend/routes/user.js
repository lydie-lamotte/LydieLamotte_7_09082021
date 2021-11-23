const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');


router.post("/signup", userCtrl.signup); //enregistrer un utilisateur
router.post("/login", userCtrl.login);  //connecter un utilisateur
router.get("/",auth, userCtrl.findAllUser);//récupérer tous les utilisateurs
router.get("/:id",auth, userCtrl.findOneUser);//récupérer un utilisateur
router.delete("/delete/:id",auth, userCtrl.deleteUser);//supprimer un utilisateur
router.put("/modify/:id",auth, userCtrl.modifyUser);//modifier un utilisateur

module.exports = router;