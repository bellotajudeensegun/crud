const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

// Configure MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud'
});

// Connect to MySQL
connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set up EJS
app.set('view engine', 'ejs');

// Define routes
app.get('/', function(req, res) {
  connection.query('SELECT * FROM users', function(err, results) {
    if (err) throw err;
    res.render('index', { users: results });
  });
});

app.get('/add', function(req, res) {
  res.render('add');
});

app.post('/add', function(req, res) {
  const { name, email, phone } = req.body;
  connection.query(
    'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone],
    function(err, result) {
      if (err) throw err;
      res.redirect('/');
    }
  );
});

app.get('/edit/:id', function(req, res) {
  const id = req.params.id;
  connection.query('SELECT * FROM users WHERE id = ?', [id], function(
    err,
    result
  ) {
    if (err) throw err;
    res.render('edit', { user: result[0] });
  });
});

app.post('/edit/:id', function(req, res) {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  connection.query(
    'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
    [name, email, phone, id],
    function(err, result) {
      if (err) throw err;
      res.redirect('/');
    }
  );
});

app.get('/delete/:id', function(req, res) {
  const id = req.params.id;
  connection.query('DELETE FROM users WHERE id = ?', [id], function(
    err,
    result
  ) {
    if (err) throw err; res.redirect('/');
});
});
app.listen(3000, function() {
    console.log('Server started on port 3000');
    });