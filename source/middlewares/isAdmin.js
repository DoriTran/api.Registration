const UserM = require('../models/User')
const jwt = require('jsonwebtoken')

const isAdmin = async (req, res, next) => {
    const token = req.body.token || req.query.token
    if (!token){
        return res.status(403).json({
            message: "No token provided",
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const us = await UserM.findOne({username: decoded.data.username})
       
        if (us.isAdmin) {
            req.user = us
            return next()
        }
        else {
            return res.status(406).json({
                message: "You are not allowed. Only admin can access."
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message
        })
    }
}

module.exports = isAdmin