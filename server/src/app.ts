import bodyParser from "body-parser";
import express from "express";

interface Controller {
    router: express.Router
}

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express()
    this.port = port

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
}

export default App
