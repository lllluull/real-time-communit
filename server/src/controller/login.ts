import * as express from 'express';
import jwt from 'jsonwebtoken'

const tokenKey = "jwtKey"

interface ILogin {
    name: string,
    password: string
}

class LoginController {
  public path = '/login';
  public router = express.Router();

  private posts: ILogin[] = [
    {
        name: 'Marcin',
        password: 'Dolor sit amet'
    }
  ];

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.LoginPost)
  }

  public getAllPosts = (request: express.Request, response: express.Response) => {
      response.send(this.posts)
  }
  public LoginPost = (request: express.Request, response: express.Response) => {
    const { user, password } = request.body
    if (user === "hupengpeng" && password === "123456" ) {
      const token = jwt.sign({ user }, tokenKey)
      response.send({code: 200, data: {token}})
    } else {
        response.send("登录失败")
    }
}
}

export default LoginController
