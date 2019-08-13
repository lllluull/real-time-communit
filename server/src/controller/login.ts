import * as express from 'express';

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
  }

  public getAllPosts = (request: express.Request, response: express.Response) => {
      console.log(request.query)
      response.send(this.posts)
  }
}

export default LoginController
