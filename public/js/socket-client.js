"use strict";
//Creando instancia de socket
const socket = io();

const alertOnline = document.querySelector("#alert-online");
const alertOffline = document.querySelector("#alert-offline");
const mensaje = document.querySelector("#mensaje");
const enviar = document.querySelector("#enviar");

// Evento que detecta cuando se establece la conección con el backend
socket.on("connect", () => {
  console.log("Conectado con el servidor");
  alertOnline.style.display = "flex";
  alertOffline.style.display = "none";
  let msn = "";
  mensaje.addEventListener("change", (e) => {
    msn = e.target.value;
  });
  enviar.addEventListener("click", () => {
    const payload = {
      mensaje: msn,
      id: "aur45",
      fecha: new Date().getTime(),
    };
    // Evento para enviar informacion al backend
    socket.emit("enviar-mensaje", payload, (id) => {
      console.log("Desde el server ", id);
    });
  });
});
// Evento que detecta cuando se interrumpe la conección con el backend
socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
  alertOffline.style.display = "flex";
  alertOnline.style.display = "none";
});

// Evento que guarda la informacion que el servidor envia
socket.on("enviar-mensaje", (payload) => {
  alert("Bienvediso todos");
});
