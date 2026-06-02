const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const chatRoutes = require('./controllers/chatRoutes');
const path = require('path');

const resultado = dotenv.config({
    path: '../.env'
});

console.log(resultado);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));
app.use('/api', chatRoutes);

// conexão com o banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'atelieSabor'
});

// rota: pegar produtos
app.get('/products', (req, res) => {
  const sql = `
    SELECT products.*, categories.name AS category
    FROM products
    JOIN categories ON products.category_id = categories.id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// rodar servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});