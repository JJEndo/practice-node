const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rutas para usuarios
app.use('/api/usuarios', usuariosRoutes);

// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
