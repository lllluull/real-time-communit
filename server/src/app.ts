import bodyParser from "body-parser";
import cors from 'cors'
import express from "express";
import http from 'http'
import webSocket from 'websocket'
const webSocketServer = webSocket.server

interface IController {
    router: express.Router
}
interface Iclient {
  [key: string]: any
}

class App {
  public app: express.Application;
  public port: number;
  public server: http.Server;
  public wsServer: webSocket.server

  constructor(controllers: IController[], port: number) {
    this.app = express()
    this.port = port
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.server = http.createServer(this.app);
    this.wsServer = new webSocketServer({
      httpServer: this.server
    });
    this.initializeIo()
  }
  public listen() {
    this.server.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
  private initializeIo() {
    const clients: Iclient = {};

    const getUniqueID = () => {
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      return s4() + s4() + '-' + s4();
    };

    this.wsServer.on('request', (request) => {
      const userID = getUniqueID();
      console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
      // You can rewrite this part of the code to accept only the requests from allowed origin
      const connection = request.accept(null, request.origin);
      const sendMessage = (json: string) => {
        // We are sending the current data to all connected clients
        Object.keys(clients).map((client) => {
          clients[client].sendUTF(json);
        });
      }
      connection.on('message', (message) => {
          if (message.type === 'utf8') {
            const dataFromClient = JSON.parse(message.utf8Data);
            const json = { type: dataFromClient.type };
            console.log(json)
            sendMessage(JSON.stringify(json));
          }
        });
      clients[userID] = connection;
      console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
}

export default App
