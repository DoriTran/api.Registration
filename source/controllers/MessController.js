const MessageM = require('../models/Message')
const User = require('../models/User')
const UserM = require('../models/User')

class MessageController{
    async getAll (req, res, next) {
        try {
            const messages1 = await MessageM.find({senderId: req.user._id, recieverId: req.body.recieverId})
            const messages2 = await MessageM.find({senderId: req.body.recieverId, recieverId: req.user._id})
            const message = [...messages1, ...messages2]
            message.sort((m1, m2) => Number(new Date(m1.createdAt)) - Number(new Date(m2.createdAt)))
            res.json(message)
        } catch (error) {
            res.status(401).json({
                message: "failed"
            })
        }
    }
    async sendMessage (req, res, next){
        const message = {
            senderId: req.user._id,
            recieverId: req.body.recieverId,
            message: req.body.message,
        }
        try {
            if (message){
                const newMessage = new MessageM(message)
                const response  = await newMessage.save()
                return res.status(200).json(response)
            }
            else{
                return res.status(401).json({
                    message: "invalid data"
                })
            }
        } catch (error) {            
            res.status(201).json({
                message: "internal server error: " + error.message
            })
        }

    }
    async getAllPartner(req, res, next) {
        const users = await UserM.find({})
        const partners = users.filter(value => value._id.toString() !== req.user._id.toString())
        res.status(200).json(partners)
    }

    async getOneUser (req, res, next){
        const userId = req.query.userId
        const us = await UserM.findOne({_id: userId})
        res.status(200).json({
            _id: us._id,
            name: us.name,
            role: us.role,
            avatar: us.avatar
        })
    }

}

module.exports = new MessageController()