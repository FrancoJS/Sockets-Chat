let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";
  throw new Error("El nombre y sala son necesarios");
}

let usuario = {
  nombre: params.get("nombre"),
  sala: params.get("sala"),
};

//Detectar conexion de usuario
socket.on("connect", () => {
  socket.emit("entrarChat", usuario, (resp) => {
    console.log("Usuarios Conectados", resp);
  });
});

// escuchar
socket.on("disconnect", () => {
  console.log("Perdimos conexión con el servidor");
});

// Enviar información
// socket.emit(
//   "crearMensaje",
//   {
//     usuario: "Jean",
//     mensaje: "Hola Mundo",
//   },
//   function (resp) {
//     console.log("respuesta server: ", resp);
//   }
// );

// Escuchar información
socket.on("crearMensaje", (mensaje) => {
  console.log("Servidor:", mensaje);
});

//Escuchar cambios de usuarios cuando un usuario entra o sale del chat
socket.on("listaPersonas", (personas) => {
  console.log(personas);
});

//Mensajes privados

socket.on("mensajePrivado", (mensaje) => {
  console.log("Mensaje privado:", mensaje);
});
