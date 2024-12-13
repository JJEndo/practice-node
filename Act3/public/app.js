const API_URL = "/api/usuarios";

const form = document.getElementById("usuarioForm");
const usuariosList = document.getElementById("usuariosList");

// Obtener usuarios y mostrarlos
const obtenerUsuarios = async () => {
  const res = await fetch(API_URL);
  const usuarios = await res.json();
  usuariosList.innerHTML = usuarios
    .map(
      (usuario) => `
      <li>
        ${usuario.nombre} (${usuario.edad} años)
        <button onclick="eliminarUsuario('${usuario._id}')">Eliminar</button>
      </li>
    `
    )
    .join("");
};

// Crear un usuario
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const edad = document.getElementById("edad").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, edad }),
  });

  form.reset();
  obtenerUsuarios();
});

// Eliminar un usuario
const eliminarUsuario = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  obtenerUsuarios();
};

// Inicializar
obtenerUsuarios();
