const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
});

// Crear un usuario
router.post('/', async (req, res) => {
    const { nombre, apellido, dni, edad, sueldo } = req.body;
    const nuevoUsuario = await prisma.usuario.create({
        data: { nombre, apellido, dni, edad: parseInt(edad), sueldo: parseFloat(sueldo) }
    });
    res.json(nuevoUsuario);
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, dni, edad, sueldo } = req.body;
    const usuarioActualizado = await prisma.usuario.update({
        where: { id: parseInt(id) },
        data: { nombre, apellido, dni, edad: parseInt(edad), sueldo: parseFloat(sueldo) }
    });
    res.json(usuarioActualizado);
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.usuario.delete({ where: { id: parseInt(id) } });
    res.json({ message: `Usuario ${id} eliminado` });
});

module.exports = router;
