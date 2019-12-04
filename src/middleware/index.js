import jwt from 'jsonwebtoken'
import UsersModel from '../models/user.model'

export default async(req, res, next) => {
    if (!req.headers.token) {
        return res.status(403).json({
            success: false,
            code: 1,
            message: "Invalid token"
        })
    }

    let data = jwt.decode(req.headers.token).data
    let detail = await UsersModel.findOne({ where : { username : data.username } })

    if (detail == null) {
        return res.status(403).json({
            success: false,
            code: 2,
            message: "Invalid token"
        })
    }

    try {
        let decoded = jwt.verify(req.headers.token, detail.token).data
        req.username = data.username
        req.id_user = detail.username
        return next()
    } catch (error) {
        if (error.message == "invalid signature") {
            res.status(403).json({
                success: false,
                code: 2,
                message: "Invalid token"
            })
        } else {
            res.status(500).json(error)
        }
    }
}