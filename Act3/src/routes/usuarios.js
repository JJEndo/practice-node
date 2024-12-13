const express = require("express");
const {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", obtenerUsuarios); // Leer todos los usuarios
router.post("/", crearUsuario); // Crear un usuario
router.put("/:id", actualizarUsuario); // Actualizar un usuario
router.delete("/:id", eliminarUsuario); // Eliminar un usuario

module.exports = router;
