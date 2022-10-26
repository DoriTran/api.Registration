const AccountModel = require('../models/Account')
const bcrypt = require('bcrypt')

class AccountController{
    async login(req, res , next) {
        const username = req.body?.username
        const password = req.body?.password
        console.log(username)
        console.log(password)
        const user = await AccountModel.findOne({username: username})
        if (user && await bcrypt.compare(password, user.password)){
            res.status(200).json({
                username: username,
                isLoggedIn: true
            })
        }
        else{
            res.status(401).json({
                message: "Invalid username or password",
            })
        }
    }

    async getAllUser (req, res, next){
        const users = await AccountModel.find({})
        res.json(users)
    }

    async getUser (req, res, next){
        let username = req.query.username

        const user = await AccountModel.findOne({username: username})

        if (!user) {
            res.status(404).json({message: "Not found"})
        }
        else {
            res.json(user)
        }
    }

    async addUser(req, res , next) {
        const username = req.body?.username
        const password = req.body?.password
        const fullname = req.body?.fullname
        const gender = req.body?.gender
        const age = req.body?.age
        
        const saltRounds = 12;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt);

        const user = await AccountModel.findOne({username: username})
        if (user){
            res.status(401).json({
                message: "This username already exists",
            })
        } else {
            await AccountModel.create({
                username: username,
                password: hashPassword,
                fullname: fullname,
                gender: gender,
                age: age
            }) 
    
            res.json({username: username, message: ` Account ${username} is added successfully`})
        }
    }
}

module.exports = new AccountController()