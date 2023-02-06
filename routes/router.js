const express = require('express');
const router = express.Router();
const db  = require('../service/dbConnection');
const { signupValidation, loginValidation } = require('./validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 
 // for login
router.post('/login2', loginValidation, (req, res, next) => {

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
           
      return res.status(200).send({
        msg: 'Logged in!',
        token,
        user: result[0]
      });


      /*
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
            const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
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
      ); */
    }
  );
});

// for user
router.get('/user', (req, res, next) => {
  db.query(
    `SELECT * FROM users;`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      return res.status(200).send({
        user: result
      });
    });
});
 // INSERT INTO `emp`.`customers` ( `first_name`, `last_name`, `email`, `password`, `created_at`) VALUES ('Shristi', 'yadav', 'shristi.yadav1@rgs.com', 'test1234', '2023-01-30');



// for user
router.post('/insertcustomer', (req, res, next) => {
  //to update fullname
  db.query(
      `INSERT INTO emp.customers( first_name, last_name, email, password, created_at) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}', '${req.body.created_at}');`,
   
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      return res.status(200).send({
        user: result
      });
    });
});

// for user
router.post('/updateuser', (req, res, next) => {
  console.log(req.body);
  var querystr = `UPDATE users SET password='${req.body.password}',  fullname = '${req.body.fullname}', email = '${req.body.email}' WHERE user_id = '${req.body.user_id}'`
  console.log(querystr);
  //to update fullname
  db.query( querystr,
   
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      return res.status(200).send({
        user: result,
        query : querystr
      });
    });
});

// for user
router.post('/updateuser2', (req, res, next) => {
  //to update email
  db.query(
      `UPDATE users SET email = '${req.body.email}' WHERE user_id = '${req.body.user_id}'`,
   
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      return res.status(200).send({
        user: result
      });
    });
});

module.exports = router;