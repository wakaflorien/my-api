import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const verifyUserToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({"status": "failed", "message": "Unauthorized request!"})
    }

    const token = req.headers['authorization'].split(" ")[1]
    if(!token){
        return res.status(401).json({"status": "failed", "message":"Access denied. No token provided."})
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
        req.user = decoded.userInfo.email
        req.roles = decoded.userInfo.roles

        next()
    } catch (error) {
        res.status(400).json({"status": "failed", "message":"Invalid token."})
    }
}
