const bcrypt = require("bcrypt");

function hashPassword(password, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return callback(err);
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) return callback(err);
      callback(null, hashedPassword);
    });
  });
}

module.exports = hashPassword;
