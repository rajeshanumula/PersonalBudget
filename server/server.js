const { static } = require("express");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mysql = require('mysql');

var account_id = 0;
var passwordHash = require('password-hash');
app.use(express.json());

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'rajeshanumula',
  password: 'R@jesh4375',
  database: 'mybudget'
});

connection.connect();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  //connection.connect();
  connection.query('insert into users (email,password,firstname,lastname) values (?,?,?,?)',
    [email, password, firstname, lastname],
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }
      if (result) {
        res.send(result);
      }
    });
});
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  connection.query('select * from users where email=?',
    [email],
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }
      if (result.length > 0) {
        encPassword = result[0].password;
        var compare = passwordHash.verify(password, encPassword);
        if (compare) {
          account_id = result[0].account_id;
          res.send(result);
        }
        else {
          res.send({ message: "Wrong password entered" });
        }
      }
      else {
        res.send({ message: "Account with this email doesn't exist"});
      }
    });
});

app.get('/categories', (req, res) => {
  connection.query('SELECT category_name, budget FROM mybudget.categories where account_id=?',
    [account_id],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
});

app.post('/addexpense', (req, res) => {
  const category_name = req.body.category_name;
  const budget = req.body.budget;
  connection.query('insert into categories (category_name,budget,account_id) values (?,?,?)',
    [category_name, budget, account_id],
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }
      if (result) {
        res.send(result);
      }
    });
});
app.post('/logout', (req, res) => {
  const email = 'xyzabc';
  const password = 'xyzabc';
  connection.query('select * from users where email=? and password=?',
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }
      if (result.length == 0) {
        account_id = 999985;
        res.send(result);
      }
    });
});





app.use(cors());
// app.use('/',express.static('public'));

const budget = require('./budget.json');

app.get('/hello', (req, res) => {
  res.send("Hello World");
});

app.get('/budget', (req, res) => {
  res.json(budget);
});

app.listen(port, () => {
  console.log(`API is Serving at http://localhost:${port}`)
});