const API_URL = 'http://localhost:3000/api/usuarios';

// Cargar usuarios al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch(API_URL);
    const usuarios = await response.json();
    const usuariosList = document.getElementById('usuariosList');

    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.textContent = `${usuario.nombre} ${usuario.apellido} - ${usuario.dni}`;
        usuariosList.appendChild(li);
    });
});

// Crear usuario
document.getElementById('usuarioForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const edad = document.getElementById('edad').value;
    const sueldo = document.getElementById('sueldo').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, dni, edad, sueldo })
    });

    window.location.reload(); // Recarga la página para actualizar la lista
});
