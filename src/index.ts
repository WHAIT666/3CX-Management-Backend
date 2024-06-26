import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from '../src/router';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server is running on http://localhost:8080/");
});


const MONGO_URL = 'mongodb+srv://andre:andre@cluster0.g60d601.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error)  => console.log(error)); 

app.use('/', router());
