const mysql = require('mysql');

const user = function(user) {
    this.lastName = user.lastName,
    this.firstName = user.lastName,
    this.email = user.email,
    this.password = user.password
};

module.exports = user;