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

router.post('/', (req, res) => {
    const {title, description, time} = req.body;

    if (!title || !time){
          return res.status(404).send('Preencher os campos de título e Horário são obrigatórios.');
    }

    const query = 'INSERT INTO notes (note_title, content, time) VALUES (?, ?, ?)';
    connection.query(query, [title, description, time], (err) => {
        if (err) {
            console.error('Erro ao inserir nota:', err);
            return res.status(500).send('Erro ao adicionar nota.');
        }

        res.redirect('/');
    });

});

module.exports = router;