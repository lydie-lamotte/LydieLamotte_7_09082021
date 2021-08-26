const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


router.post("/signup", userCtrl.signup); //enregistrer un utilisateur
router.post("/login", userCtrl.login);  //connecter un utilisateur
router.get("/", userCtrl.findAllUser);//récupérer tous les utilisateurs
router.get("/:id", userCtrl.findOneUser);//récupérer un utilisateur
router.delete("/delete/:id", userCtrl.deleteUser);//supprimer un utilisateur
router.put("/modify/:id", userCtrl.modifyUser);//modifier un utilisateur

module.exports = router;