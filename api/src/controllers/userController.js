import user from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import Model from "../models/Post.js";
import produtoAcabado from "../models/ProdutoAcabado.js";
import productionCode from "../models/ProductionCode.js";

class UserController {
    static async listarUser(req, res) {
        try {
            const userList = await user.find({});
            res.status(200).json(userList);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to list users.` });
        }
    }

    static async listarUserById(req, res) {
        return await UserController.handleUserRequest(req, res, user.findById(req.params.id), "Failed to list user.");
    }

    static async registerUser(req, res) {
        try {
            const { password, ...rest } = req.body;

            const imageResult = await Model.create({
                url: req.file.location
            });

            const imgUrl = imageResult.url;

            const newUser = await user.create({
                ...rest,
                password: await bcrypt.hash(password, 10),
                img: imgUrl
            });

            const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
            const createdAt = new Date().toLocaleString('pt-BR', options).replace(',', '');

            await user.updateMany(
                { _id: { $ne: newUser._id } },
                {
                    $push: {
                        notifications: {
                            id: uuidv4(),
                            userId: newUser._id,
                            login: newUser.login,
                            department: newUser.department,
                            name: newUser.name,
                            img: newUser.img,
                            message: `Novo usuário! Bem vindo ao System, ${newUser.name}.`,
                            createdAt: createdAt
                        }
                    }
                }
            );

            res.status(201).json({ message: "Usuário criado com sucesso!", user: newUser });
        } catch (error) {
            console.error('Error in registerUser:', error);
            res.status(500).json({ message: `${error.message} - Falha ao criar usuário.` });
        }
    }

    static async loginUser(req, res) {
        const { login, password } = req.body;
        try {
            const userFound = await user.findOne({ login });

            if (!userFound) return res.status(404).json({ message: 'Usuário não encontrado.' });

            if (!(await bcrypt.compare(password, userFound.password))) {
                return res.status(401).json({ message: 'Senha ou login inválidos.' });
            }

            const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({
                message: 'Login realizado com sucesso!',
                user: { id: userFound._id, login: userFound.login, img: userFound.img, name: userFound.name, department: userFound.department },
                token,
            });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao realizar login.` });
        }
    }

    static async updateUser(req, res) {
        return await UserController.handleUserRequest(req, res, user.findByIdAndUpdate(req.params.id, req.body, { new: true }), "Failed to update user.");
    }

    static async deleteUser(req, res) {
        return await UserController.handleUserRequest(req, res, user.findByIdAndDelete(req.params.id), "Failed to delete user.");
    }

    static async listarUserByLogin(req, res) {
        return await UserController.handleUserRequest(req, res, user.findOne({ login: req.params.login }), "Failed to list user.");
    }

    static async checkLogin(req, res) {
        return await UserController.checkAvailability(req, res, "login", "Login já existe.", "Login disponível.");
    }

    static async handleUserRequest(req, res, findPromise, errorMessage) {
        try {
            const userFound = await findPromise;
            if (!userFound) return res.status(404).json({ message: "User not found" });
            res.status(200).json(userFound);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - ${errorMessage}` });
        }
    }

    static async checkAvailability(req, res, field, existsMessage, availableMessage) {
        const trimmedValue = req.body[field].trim();
        try {
            const userExists = await user.findOne({ [field]: trimmedValue });
            return userExists ? res.status(400).json({ message: existsMessage }) : res.status(200).json({ message: availableMessage });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao verificar ${field}.` });
        }
    }

    static async deleteNotification(req, res) {
        try {
            const { userId, notificationId } = req.params;

            const updatedUser = await user.findByIdAndUpdate(
                userId,
                { $pull: { notifications: { id: notificationId } } },
                { new: true }
            );

            if (!updatedUser) return res.status(404).json({ message: "Usuário não encontrado." });
            res.status(200).json({ message: "Notificação deletada com sucesso.", user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao deletar notificação.` });
        }
    }

    static async createNotification(req, res) {
        const { senderId, senderName, senderLogin, message, senderImg, senderDepartment, receiverLogin, receiverDepartment } = req.body;

        try {
            const receivers = await user.find({
                $or: [
                    { login: receiverLogin },
                    { department: receiverDepartment }
                ]
            });

            if (receivers.length === 0) {
                return res.status(404).json({ message: 'Usuário(s) receptor(es) não encontrado(s).' });
            }

            const sender = {
                id: senderId,
                name: senderName,
                login: senderLogin,
                department: senderDepartment,
                img: senderImg
            };

            const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
            const createdAt = new Date().toLocaleString('pt-BR', options).replace(',', '');

            await user.updateMany(
                {
                    $or: [
                        { login: receiverLogin },
                        { department: receiverDepartment }
                    ]
                },
                {
                    $push: {
                        notifications: {
                            id: uuidv4(),
                            userId: sender.id,
                            login: sender.login,
                            name: sender.name,
                            img: sender.img,
                            department: sender.department,
                            message: message,
                            createdAt: createdAt
                        }
                    }
                }
            );

            return res.status(200).json({ message: 'Notificação enviada com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: `${error.message} - Erro ao enviar notificação.` });
        }
    }

    static async followUser(req, res) {
        const { followerId, followerName, followerLogin, followerImg, followerDepartment } = req.body;

        try {
            const userToFollow = await user.findById(req.params.id);
            const follower = { id: followerId, name: followerName, login: followerLogin, img: followerImg, department: followerDepartment };

            if (!userToFollow) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            if (!userToFollow.followers.some(f => f.id === followerId)) {
                userToFollow.followers.push(follower);
                await userToFollow.save();

                const followerUser = await user.findById(followerId)
                const userBeingFollowed = {
                    id: userToFollow._id,
                    name: userToFollow.name,
                    login: userToFollow.login,
                    img: userToFollow.img
                };

                if (!followerUser.following.some(f => f.id === userToFollow._id.toString())) {
                    followerUser.following.push(userBeingFollowed)
                    await followerUser.save()
                }

                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
                const createdAt = new Date().toLocaleString('pt-BR', options).replace(',', '')

                await user.findByIdAndUpdate(
                    req.params.id,
                    {
                        $push: {
                            notifications: {
                                id: uuidv4(),
                                login: follower.login,
                                name: follower.name,
                                img: follower.img,
                                department: follower.department,
                                message: `${follower.name} começou a te seguir!`,
                                createdAt: createdAt
                            }
                        }
                    },
                    { new: true }
                )

                return res.status(200).json({ message: 'Usuário seguido com sucesso.' })
            } else {
                return res.status(400).json({ message: 'Você já está seguindo este usuário.' })
            }
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao seguir o usuário.` })
        }
    }

    static async unfollowUser(req, res) {
        const { followerId } = req.body;
        const userIdToUnfollow = req.params.id

        try {
            const userToUnfollow = await user.findById(userIdToUnfollow)
            const followerUser = await user.findById(followerId)

            if (!userToUnfollow || !followerUser) {
                return res.status(404).json({ message: 'Usuário não encontrado.' })
            }

            const isFollowing = userToUnfollow.followers.some(f => f.id.toString() === followerId.toString())
            const isFollowed = followerUser.following.some(f => f.id.toString() === userToUnfollow._id.toString())

            if (isFollowing && isFollowed) {

                userToUnfollow.followers = userToUnfollow.followers.filter(f => f.id.toString() !== followerId.toString())
                await userToUnfollow.save()

                followerUser.following = followerUser.following.filter(f => f.id.toString() !== userToUnfollow._id.toString())
                await followerUser.save()

                return res.status(200).json({ message: 'Deixou de seguir o usuário com sucesso.' })
            } else {
                return res.status(400).json({ message: 'Você não está seguindo este usuário.' })
            }
        } catch (error) {
            return res.status(500).json({ message: `${error.message} - Falha ao deixar de seguir o usuário.` });
        }
    }

    static async createImage(req, res) {
        try {
            const { location: url = '' } = req.file;

            const post = await Model.create({
                url
            });

            res.status(201).json(post);
        } catch (error) {
            console.error('Error in criarPost:', error);
            res.status(500).json({ message: `${error.message} - Failed to create post.` });
        }
    }

    static async createProdutoAcabado(req, res) {
        const { code, description, recipe, weight } = req.body;

        try {
            const newProdutoAcabado = await produtoAcabado.create(req.body)
            res.status(201).json({ message: "Produto Acabado cadastrado com sucesso!" })
        } catch (error) {
            console.error('Error in register Produto Acabado:', error);
            res.status(500).json({ message: `${error.message} - Falha ao cadastrar Produto Acabado.` });
        }
    }

    static async listarProdutosAcabados(req, res) {
        try {
            const produtoAcabadoList = await produtoAcabado.find({});
            res.status(200).json(produtoAcabadoList);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to list Produtos Acabados.` });
        }
    }

    static async listarProdutoAcabadoByCode(req, res) {
        const { code } = req.query;
    
        try {
            const produto = await produtoAcabado.findOne({ code });
            if (!produto) {
                return res.status(404).json({ message: 'Produto Acabado não encontrado.' });
            }
            res.status(200).json(produto);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to fetch Produto Acabado by code.` });
        }
    }

    static async updateProdutoAcabadoByCode(req, res) {
        const { code, description, recipe, weight } = req.body

        try {
            if (!code) {
                return res.status(400).json({ message: "O código do produto acabado é obrigatório." });
            }

            const PA = await produtoAcabado.findOneAndUpdate(
                { code },
                { description, recipe, weight },
                { new: true, runValidators: true }
            );

            if (!PA) {
                return res.status(404).json({ message: "Produto Acabado não encontrado." });
            }

            res.status(200).json({ message: "Produto Acabado atualizado com sucesso!", PA });
        } catch (error) {
            console.error('Error in update Produto Acabado:', error);
            res.status(500).json({ message: `${error.message} - Falha ao atualizar Produto Acabado.` });
        }
    }

    static async deleteProdutoAcabadoByCode(req, res) {
        const { code } = req.body;

        try {
            if (!code) {
                return res.status(400).json({ message: "O código do produto acabado é obrigatório." });
            }

            const deletedProduto = await produtoAcabado.findOneAndDelete({ code });

            if (!deletedProduto) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }

            res.status(200).json({ message: "Produto deletado com sucesso!", deletedProduto });
        } catch (error) {
            console.error('Error in delete Produto Acabado:', error);
            res.status(500).json({ message: `${error.message} - Falha ao deletar Produto.` });
        }
    }

    static async generateProductionCode(req, res) {
        const { loggedUserId, loggedUserName, loggedUserLogin, machineNumber } = req.body;
    
        try {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const now = new Date();
    
            const formattedDate = now.toLocaleString('pt-BR', options).replace(',', '').replace(/\//g, '');
    
            const hours = now.getHours();
            const minutes = now.getMinutes();
    
            let periodCode = '';
            if ((hours >= 5 && (hours < 15 || (hours === 15 && minutes < 15)))) {
                periodCode = '01';
            } else {
                periodCode = '02';
            }
    
            const productionCodeGenerated = `${formattedDate}${periodCode}0${machineNumber}`;
    
            const existingCode = await productionCode.findOne({ code: productionCodeGenerated });
            if (existingCode) {
                return res.status(400).json({ message: "Erro, código de produção já existe." });
            }
    
            const newProductionCode = new productionCode({
                code: productionCodeGenerated,
                generatedBy: [{ 
                    id: loggedUserId,
                    name: loggedUserName, 
                    login: loggedUserLogin 
                }]
            });
    
            await newProductionCode.save();
    
            res.status(200).json({ message: "Código de produção gerado e salvo com sucesso!", code: productionCodeGenerated });
        } catch (error) {
            console.error('Error in generateProductionCode:', error);
            res.status(500).json({ message: `${error.message} - Falha ao gerar e salvar código de produção.` });
        }
    }

    static async searchProduction(req, res) {
        try {
            const { code } = req.params;
    
            const production = await productionCode.findOne({ code: code });
    
            if (!production) {
                return res.status(404).json({ message: "Produção não encontrada." });
            }
    
            return res.status(200).json(production);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar a produção.", error });
        }
    }

    static async updateProduction(req, res) {
        try {
            const { code } = req.params;
            const { editPaCode, editQuantity } = req.body
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserController;
