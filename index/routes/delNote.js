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

router.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    const query = 'DELETE FROM notes WHERE id = ?';
    connection.query(query, [noteId], (error, results) => {
        if (error) {
            console.error('Erro ao deletar nota:', error);
            res.status(500).send('Erro ao deletar nota');
        } else {
            res.status(200).send('Nota deletada');
        }
    });
});


module.exports = router;
