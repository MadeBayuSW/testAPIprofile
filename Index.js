const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: '34.101.226.183',
  user: 'root', // sesuaikan dengan nama pengguna MySQL Anda
  password: 'Madebayu@22', // sesuaikan dengan kata sandi MySQL Anda
  database: 'data',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.use(bodyParser.json());

app.post('/users', (req, res) => {
  const newUser = {
    nama: req.body.nama,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    email: req.body.email,
    nomorTelepon: req.body.nomorTelepon,
  };

  db.query('INSERT INTO users SET ?', newUser, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).send('User created successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
