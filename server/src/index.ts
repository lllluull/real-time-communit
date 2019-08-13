import App from "./app"
import LoginController from "./controller/login"
const app = new App(
  [
    new LoginController(),
  ],
  5000,
);

app.listen()
