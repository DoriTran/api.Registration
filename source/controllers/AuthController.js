const UserM = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthController{
    async login(req, res , next) {
        const username = req.body?.username
        const password = req.body?.password
        const user = await UserM.findOne({username: username})
        if (user && await bcrypt.compare(password, user.password)){
            const token = jwt.sign({
                data:{
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    role: user.role,
                },
            }, process.env.TOKEN_SECRET, {
                expiresIn: 60 * 60 * 24 * 30 * 365,
            })

            const issuedDatetime = new Date()
            const expiredDatetime = new Date(issuedDatetime);
            expiredDatetime.setDate(issuedDatetime.getDate() + 1)

            res.status(200).json({
                AUTH_TOKEN: token,
                issued: issuedDatetime.toLocaleString(),
                expired: expiredDatetime.toLocaleString(),
            })
        }
        else{
            res.status(401).json({
                message: "Invalid username or password",
            })
        }
    }

    async getAllUser (req, res, next){
        const users = await UserM.find({})
        res.json(users)
    }

    async addUser(req, res , next) {
        const username = req.body?.username
        const password = req.body?.password
        const name = req.body?.name
        const isAdmin = false
        const avatar = "https://shop.phuongdonghuyenbi.vn/wp-content/uploads/avatars/1510/default-avatar-bpthumb.png"
        
        const saltRounds = 12;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPw = bcrypt.hashSync(password, salt);

        const user = await UserM.findOne({username: username})
        if (user){
            res.status(401).json({
                message: "This username already exists",
            })
        } else {
            await UserM.create({
                username: username,
                password: hashPw,
                name: name,
                isAdmin: isAdmin,
                avatar: avatar,
            }) 
    
            res.json({message: ` Account ${username} is added successfully`})
        }
    }

    async updateUser (req, res, next) {
        const oldUsername = req.body.oldUsername
        const username = req.body?.username
        const password = req.body?.password
        const name = req.body?.name
        const isAdmin = false
        const avatar = "https://shop.phuongdonghuyenbi.vn/wp-content/uploads/avatars/1510/default-avatar-bpthumb.png"
        
        const acc = await UserM.findOne({username: oldUsername})
        const newAcc = await UserM.findOne({username: username})
        if (!acc)
            return res.status(404).json({message: "Not found"})

        if (newAcc && username !== oldUsername)
            return res.status(406).json({message: "This username already exists"})

        const saltRounds = 12;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPw = bcrypt.hashSync(password, salt);

        await UserM.findOneAndUpdate({username: oldUsername},{
            username: username,
            password: hashPw,
            name: name,
            isAdmin: isAdmin,
            avatar: avatar,
        }) 

        res.json({message: `Account ${username} is updated successfully`})
    }

    async deleteUser (req, res, next) {
        const username = req.body?.username
        const acc = await UserM.findOne({username: username})
    
        if (!acc)
            return res.status(404).json({message: "Not found"})


        await UserM.findOneAndDelete({username: username})

        res.json({message: `Account ${username} is deleted successfully`})
    }
}

module.exports = new AuthController()