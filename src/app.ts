import "dotenv/config";
import express, { response } from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { router } from "./routes";


const app = express();
app.use(cors())
const serverHttp = http.createServer(app);

const io = new Server(serverHttp,{
  cors:{
    origin: "*"
  }
});

io.on("connection",(socket)=>{
  console.log(`Usuario connectado no socket ${socket.id}`);
});


app.use(express.json());
app.use(router);

app.get("/github", (request, response)=>{
  response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
})
app.get("/signin/collback", (request, response)=>{
const {code }= request.query;

return response.json(code);
  // response.redirect(``)

});

export {serverHttp, io};