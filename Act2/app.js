const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "database-mysql",
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos.");
});

// Configurar middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración del motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Ruta principal: Mostrar usuarios y pedidos
app.get('/', (req, res) => {
  const query = `
    SELECT users.id, users.name AS user_name, users.email, users.age, orders.product, orders.price
    FROM users
    LEFT JOIN orders ON users.id = orders.user_id
  `;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.render('index', { data: results });
  });
});

// Ruta para agregar un usuario
app.post('/add-user', (req, res) => {
  const { name, email, age } = req.body;
  const query = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
  connection.query(query, [name, email, age], (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Ruta para actualizar un usuario
app.post('/update-user', (req, res) => {
  const { id, name, email, age } = req.body;
  const query = "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?";
  connection.query(query, [name, email, age, id], (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Ruta para eliminar un usuario
app.post('/delete-user', (req, res) => {
  const { id } = req.body;
  const query = "DELETE FROM users WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Cerrar la conexión al finalizar
process.on("exit", () => {
  connection.end();
});
