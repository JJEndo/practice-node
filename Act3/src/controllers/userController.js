const Usuario = require("../models/usuario");

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).send("Error al obtener los usuarios");
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).send("Error al crear el usuario");
  }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).send("Error al actualizar el usuario");
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuario.findByIdAndDelete(id);
    res.send("Usuario eliminado");
  } catch (error) {
    res.status(500).send("Error al eliminar el usuario");
  }
};

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
