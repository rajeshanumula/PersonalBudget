const { static } = require("express");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mysql = require('mysql');
var date=new Date();
var account_id = date.getTime();
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
          res.send({ message: 2 });
        }
      }
      else {
        res.send({ message: 1});
      }
    });
});

app.get('/categories', (req, res) => {
  //connection.query('SELECT category_name, budget FROM mybudget.categories where account_id=?',
  connection.query('SELECT category_name,sum(budget) as budget FROM mybudget.categories where account_id=? group by category_name;',
    [account_id],
    function (error, results, fields) {
      if (error) throw error;
      //console.log(results);
      res.json(results);
    });
});

app.get('/listofcategories', (req, res) => {
  connection.query('SELECT category_id,category_name, budget FROM mybudget.categories where account_id=?',
    [account_id],
    function (error, results, fields) {
      if (error) throw error;
      //console.log(results);
      res.json(results);
    });
});

app.get('/monthlybudget', (req, res) => {
  //connection.query('select sum(budget) as budget , m.month_name from categories c inner join months m using(month_id) where c.account_id=? group by c.month_id order by c.month_id',
  connection.query('select sum(budget) as budget , m.month_name , group_concat(c.category_name SEPARATOR ",  ") as category_name from categories c inner join months m using(month_id) where c.account_id=? group by c.month_id order by c.month_id',
    [account_id],
    function (error, results, fields) {
      if (error) throw error;
     // console.log(results);
      res.json(results);
    });
});

app.post('/addexpense', (req, res) => {
  const month_id=req.body.month;
  const category_name = req.body.category_name;
  const budget = req.body.budget;
  connection.query('insert into categories (category_name,budget,month_id,account_id) values (?,?,?,?)',
    [category_name, budget, month_id, account_id],
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }
      if (result) {
        res.send(result);
      }
    });
});

app.put('/updateexpense', (req, res) => {
  const category_id = req.body.category_id;
  const budget = req.body.budget;
  connection.query('update categories set budget=? where category_id=?',
    [budget,category_id],
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }
      if (result) {
        res.send(result);
      }
    });
});

app.post('/deleteexpense', (req, res) => {
  const category_id = req.body.category_id;
  //console.log(category_id);
  connection.query('delete from categories where category_id=?',
    [category_id],
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }
      if (result) {
        res.send(result);
      }
    });
});
app.get('/logout', (req, res) => {
  var date=new Date();
  const email = "xyzabc";
  const password = "xyzabc";
  connection.query('select * from users where email=? and password=?',
    [email, password],
    (err, result) => {
      //console.log(result);
      if (err) {
        res.send({ err: err })
      }
      if (result.length == 0) {
        account_id = date.getTime();
        //console.log(result);
        res.send(result);
      }
    });
});





app.use(cors());

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