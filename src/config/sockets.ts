import { createServer, Server } from "http";
import SocketIO, { Server as SV, Socket } from "socket.io";
import { Application } from "express";
import { config } from "./config";

export class SocketsNode {
  public httpServer: Server;
  public io: SocketIO.Server;

  constructor(app: Application) {
    this.httpServer = createServer(app);
    // Creando instancia de Socket
    this.io = new SV(this.httpServer);
  }

  public startSockets() {
    this.httpServer.listen(config.api.port, () => {
      console.log("Servidor corriendo en el puerto ", config.api.port);
    });
    this.onConnection();
  }
  public onConnection() {
    this.io.on("connection", (socket: Socket) => {
      // Mostrando id del cliente conectado
      console.log("Cliente conectado", socket.id);
      socket.on("disconnect", () => {
        console.log("Cliente desconectado", socket.id);
      });
      // Recibiendo informacion enviada desde cliente
      this.onReceivedMessage(socket);
    });
  }

  public onReceivedMessage(socket: Socket) {
    socket.on("enviar-mensaje", (data, callback) => {
      console.log("Mensaje recibido en el servidor", data);
      // Devolver respuesta al cliente que emitio el evento
      callback("Mensaje enviado correctamente");
      // Para emitir un evento en todos los clientes usar el io
      // this.io.emit("enviar-mensaje", "Desde el server");
      // Para emitir eventos en todos menos en el cliente que emite usar broadcast con el objeto Socket
      this.onSendMessage(socket);
    });
  }
  public onSendMessage(socket: Socket) {
    socket.broadcast.emit("enviar-mensaje", "Alerta para todos los usuarios");
  }
}
