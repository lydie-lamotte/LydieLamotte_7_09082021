const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();
passwordSchema
.is().min(8)                                    // Minimum 8 charactères
.is().max(100)                                  // Maximum 100 charactères
.has().uppercase()                              // lettres miniscules
.has().lowercase()                              // lettres majuscules
.has().digits(1)                                // doit contenir un symbole
.has().not().spaces()                           // pas d'espace
.is().not().oneOf(['Passw0rd', 'Password123']); // interdit

module.exports = passwordSchema;