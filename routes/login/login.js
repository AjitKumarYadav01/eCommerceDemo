const express = require('express');
const router = express.Router();
const db  = require('../../service/dbConnection');
const { signupValidation, loginValidation } = require('../validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UtilService = require('../../service/UtilService.js');
 
 // for login
router.post('/login', loginValidation, (req, res, next) => {

  console.log(req.body);

  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      console.log(result.length);
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email or password is incorrect1!'
        });
      }
      const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Email or password is incorrect2!'
            });
          }
          if (bResult) {
           /*
            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            */
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      ); 
    }
  );
});

// Signup
router.post('/signup', (req, res, next) => {
    console.log(req.body);
    var m = req.body;
    var saltRounds = 10;
    bcrypt.hash(m.password, saltRounds)
    .then(hashPassword => {
    //UtilService.hashPassword(m.password).then((passwordHash) => {
    //  console.log(passwordHash);
  //});
    //console.log(hashPassword);
    db.query(`INSERT INTO emp.users(username,password,fullname,email)VALUES ('${m.username}', '${hashPassword}', '${m.fullname}', '${m.email}');`,
            (err, result) => {
                // user does not exists
                if (err) {
                throw err;
                return res.status(400).send({
                    msg: err
                });
                }
                return res.status(200).send({
                    msg: 'User Created',
                    user: result[0]
                });
            });
          })
          .catch(err => {
            return res.status(400).send({
              msg: err
          });
      });
    /*
    var hashedPassword;
    bcrypt.genSalt(10, function (err, Salt) {
    // The bcrypt is used for encrypting password.
        bcrypt.hash(req.body.password, Salt, function (err, hash) {
            if (err) {
                return res.status(400).send({
                    msg: 'Error in encryption'
                });
                }
            hashedPassword = hash;
            console.log ({ user : req.body.username, password : hashedPassword});    
            db.query(`INSERT INTO emp.users(username,password,fullname,email)VALUES ('${req.body.username}', '${hashedPassword}', '${req.body.fullname}', '${req.body.email}');`,
            (err, result) => {
                // user does not exists
                if (err) {
                throw err;
                return res.status(400).send({
                    msg: err
                });
                }
                return res.status(200).send({
                    msg: 'User Created',
                    user: result[0]
                });
            });
        });
    });*/
});

  // forgetpassword
router.post('/forgetpassword', (req, res, next) => {
    //console.log(req.body);  
    db.query(
      `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
        if (!result.length) {
          return res.status(200).send({
            msg: 'Email not found!'
          });
        }
             
        return res.status(200).send({
          msg: 'Email found',
          user: result[0]
        });

      }
    );
  });

  // resetpassword
router.post('/resetpassword', (req, res, next) => {
    console.log(req.body);
    var saltRounds = 10;
    var m = req.body
    bcrypt.hash(m.password, saltRounds)
    .then(hashPassword => {
      db.query(
        `update users set password = '${hashPassword}' WHERE email = ${db.escape(m.email)};`,
        (err, result) => {
          // user does not exists
          if (err) {
            throw err;
            return res.status(400).send({
              msg: err
            });
          }
          return res.status(200).send({
            msg: 'Password successfully updated',
            user: result[0]
          });

        });
      }).catch(err => {
        return res.status(400).send({
          msg: err
        });
      });

  });





module.exports = router;