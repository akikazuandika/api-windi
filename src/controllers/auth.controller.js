import UsersModel from '../models/user.model'
import bcrypt from 'bcrypt'
import { genRandomString } from '../lib/randomString'
import Sequelize from 'sequelize'
import jwt from 'jsonwebtoken'
const Op = Sequelize.Op

export default {
    login : async(req, res) => {
        if(!req.body.username || !req.body.password){
            return res.status(400).json({
                success : false,
                message : "Invalid data"
            })
        }

        let userData = await UsersModel.findOne({ where : { username : req.body.username } })

        if (userData == null) {
            res.status(404).json({
                success : false,
                message : "User not found"
            })
        }else{
            let isValid = await bcrypt.compare(req.body.password, userData.password)
            if (isValid == false) {
                res.status(400).json({
                    success : false,
                    message : "Wrong password"
                })
            }else{
                let token = jwt.sign({
                    data : {
                        user_id : userData.user_id,
                        name : userData.name,
                        username : userData.username,
                        email : userData.email,
                        phone : userData.phone
                    }
                }, userData.token, { expiresIn : Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 1) })
                res.json({
                    success : true,
                    data : {
                        user_id : userData.user_id,
                        name : userData.name,
                        username : userData.username,
                        email : userData.email,
                        phone : userData.phone
                    },
                    token
                })
            }
        }
    },
    register : async(req, res) => {
        if(!req.body.name || !req.body.username || !req.body.email || !req.body.phone || !req.body.password){
            return res.status(400).json({
                success : false,
                message : "Invalid data"
            })
        }

        let password = await bcrypt
        .hash(req.body.password, 11)
        .then(password => {
            return password
        })

        let token = genRandomString(50)

        let data = {
            name : req.body.name,
            username : req.body.username,
            password,
            email : req.body.email,
            phone : req.body.phone,       
            token
        }

        UsersModel
        .findOrCreate({ where : {[Op.or] : [{ username : req.body.username }, { phone : req.body.phone }, { email : req.body.email }]}, defaults : data })
        .then(([user, created]) => {
            if (created == true) {
                res.json({
                    success : true,
                    message : "User created successfully"
                })
            }else{
                res.status(400).json({
                    success : false,
                    message : "Username or phone or email already registered"
                })
            }
        })
        .catch(err => res.status(500).json(err))
    }
}