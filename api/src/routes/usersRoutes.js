import express from "express";
import UserController from "../controllers/userController.js";
import multer from "multer"
import multerConfig from "../config/multer.js";

const routes = express.Router();

const upload = multer(multerConfig);

routes.get("/usuarios", UserController.listarUser);
routes.get("/usuarios/:id", UserController.listarUserById);
routes.get("/usuarios/login/:login", UserController.listarUserByLogin);
routes.post("/usuarios", upload.single('image'), UserController.registerUser);
routes.post("/check-login", UserController.checkLogin);
routes.post("/usuarios/login", UserController.loginUser);
routes.put("/usuarios/:id", UserController.updateUser);
routes.delete("/usuarios/:id", UserController.deleteUser);
routes.delete('/usuarios/:userId/notifications/:notificationId', UserController.deleteNotification);
routes.post('/usuarios/:id/follow', UserController.followUser);
routes.post('/notifications', UserController.createNotification);
routes.post('/usuarios/:id/unfollow', UserController.unfollowUser);
routes.post('/posts', multer(multerConfig).single('file'), UserController.createImage);

routes.post('/produtosacabados', UserController.createProdutoAcabado)
routes.post("/generateproductioncode", UserController.generateProductionCode)
routes.get('/produtosacabados/codigo', UserController.listarProdutoAcabadoByCode)
routes.get("/embalagem/:code", UserController.searchProduction);
routes.get("/produtosacabados", UserController.listarProdutosAcabados);
routes.put("/produtosacabados/update", UserController.updateProdutoAcabadoByCode)
routes.delete("/produtosacabados", UserController.deleteProdutoAcabadoByCode)

export default routes;
