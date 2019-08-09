import express from "express"
const app = express();
import bodyParser from "body-parser"
import http from "http"
import Socket from "socket.io"
app.use(bodyParser.json());
const server = new http.Server(app)
const io = Socket(server);

const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
server.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );