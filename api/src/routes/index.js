import express from "express"
import users from "./usersRoutes.js"
import multer from "multer"

const routes = (app) => {
    app.use(express.json())
    
    app.route("/").get((req,res) => {
        res.status(200).send("Curso de Node.js")
    });

    app.use(users)
};

export default routes