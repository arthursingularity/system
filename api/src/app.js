import express from "express"
import dataBaseConnect from "./config/dbconnect.js"
import routes from "./routes/index.js"
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan'

const app = express()

dotenv.config();

const connection = await dataBaseConnect()

connection.on("error", (erro) => {
    console.error("Erro de conexão", erro)
})

connection.once("open", () => {
    console.log("SystemDataBase connection made successfully!")
});

app.use(morgan('dev'))
app.use(cors());
routes(app)

export default app