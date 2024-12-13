const express = require("express");
const usuariosRoutes = require("./src/routes/usuarios");
const path = require("path");

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// // Middleware para servir archivos estáticos
// app.use(express.static(path.join(__dirname, "public")));

// Configurar las rutas
app.use("/api/usuarios", usuariosRoutes);

// Ruta explícita para servir `index.html` en la raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
