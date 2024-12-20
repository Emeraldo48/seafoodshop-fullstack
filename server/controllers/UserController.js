const {User, Cart} = require('../models/models')
const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const generateJWT = (id, email, role) => {
    return jsonwebtoken.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: "24h"});
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body;
            if(!email || !password) {
                return next(ApiError.badRequest("Вы не ввели логин или пароль"));
            }
            const findUser = await User.findOne({where: {email}});
            if(findUser) {
                return next(ApiError.badRequest("Пользователь с такой почтой уже существует"));
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({email, role, password: hashPassword});
            const cart = await Cart.create({userId: user.id});
            const token = generateJWT(user.id, email, role);
            return res.json({token});
        } catch(e) {
            return next(ApiError.badRequest(e.message));
        }

    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            if(!email || !password) {
                return next(ApiError.badRequest("Вы не ввели логин или пароль"));
            }
            const user = await User.findOne({where: {email}});
            if(!user) {
                return next(ApiError.badRequest("Пользователь с указанной почтой не найден"));
            }
            let comparePassword = bcrypt.compareSync(password, user.password);
            if(!comparePassword) {
                return next(ApiError.internal("Вы ввели неправильный пароль"));
            }
            const token = generateJWT(user.id, user.email, user.role);
            return res.json({token});
        } catch(e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async check(req, res, next) {
        try {
            const {id, email, role} = req.user;
            const token = generateJWT(id, email, role);
            return res.json({token});
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }

    }
}

module.exports = new UserController();