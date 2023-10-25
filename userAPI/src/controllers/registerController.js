const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../config/dbConnection');

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    // Verificar si el correo electrónico o nombre de usuario ya existen en la base de datos
    const [emailRow] = await conn.execute('SELECT `email` FROM `users` WHERE `email` = ?', [req.body.email]);
    const [usernameRow] = await conn.execute('SELECT `username` FROM `users` WHERE `username` = ?', [req.body.username]);

    if (emailRow.length > 0) {
      return res.status(422).json({
        message: 'The email is already in use.',
      });
    }

    if (usernameRow.length > 0) {
      return res.status(422).json({
        message: 'The username is already in use.',
      });
    }

    const hashPass = await bcrypt.hash(req.body.password, 12);

    const [rows] = await conn.execute(
      'INSERT INTO `users` (`name`, `email`, `username`, `password`) VALUES (?, ?, ?, ?)',
      [req.body.name, req.body.email, req.body.username, hashPass]
    );

    if (rows.affectedRows === 1) {
      return res.status(201).json({
        message: 'The user has been successfully registered.',
      });
    }
  } catch (err) {
    next(err);
  }
};
