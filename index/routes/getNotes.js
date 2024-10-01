const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'desperta_db'
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados.');
    }
});

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM notes ORDER BY time ASC'; 

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).json({ error: 'Erro ao buscar notas no banco de dados' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;