const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const http = require('http');
const addNotesRouter = require('./routes/addNotes');
const delNotesRouter = require('./routes/delNote');
const getNotesRouter = require('./routes/getNotes');

const app = express();
const port = 3000;
const server = http.createServer(app);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'desperta_db'
  });

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.use('/addNote', addNotesRouter);
app.use('/delNote', delNotesRouter);
app.use('/getNotes', getNotesRouter);

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});