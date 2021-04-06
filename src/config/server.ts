import express, { Application } from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import { SocketsNode } from "./sockets";
class ServerNode {
  private app: Application;
  constructor() {
    this.app = express();
    // Middlewares
    this.middlewares();
    // Rutas
    this.routes();
    // Iniciar Sockets
    this.sockets();
  }
  private routes() {
    // this.app.use(userRouter);
  }
  private middlewares() {
    // Para leer el body y los form
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // Para mostrar estadisticas de las peticiones http
    this.app.use(morgan("dev"));
    // Archivos publicos
    this.app.use(
      "/public",
      express.static(path.resolve(__dirname, "../../public"))
    );
    console.log(path.resolve(__dirname, "../../public"));
  }

  private sockets() {
    const socket = new SocketsNode(this.app);
    socket.startSockets();
  }
}

export default ServerNode;
