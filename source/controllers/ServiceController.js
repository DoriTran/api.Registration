const ServiceM = require('../models/Service')

class ServiceController{
    async getAllService (req, res, next){
        const services = await ServiceM.find({})
        res.json(services)
    }

    async getOneService (req, res, next){
        const _name = req.body.name;
        const service = await ServiceM.findOne({name: _name})
        
        if (!service)
            return res.status(404).json({message: "Not found"})
        else
            res.json(service)
    }

    async add (req, res, next) {
        const _name = req.body.name;
        const _desc = req.body.description;
        const _price = req.body.price;
        const service = await ServiceM.findOne({name: _name})
    
        if (service)
            return res.status(406).json({message: "This service already exists"})

        await ServiceM.create({
            name: _name,
            description: _desc,
            price: _price,
        }) 

        res.json({message: ` ${_name} is added successfully`})
    }

    async update (req, res, next) {
        const _oldName = req.body.oldName
        const _name = req.body.name;
        const _desc = req.body.description;
        const _price = req.body.price;
        const service = await ServiceM.findOne({name: _oldName})
        const newService = await ServiceM.findOne({name: _name})
        if (!service)
            return res.status(404).json({message: "Not found"})

        if (newService && _name !== _oldName)
            return res.status(406).json({message: "This service already exists"})

        await ServiceM.findOneAndUpdate({name: _oldName},{
            name: _name,
            description: _desc,
            price: _price,
        }) 

        res.json({message: `${_name} is updated successfully`})
    }

    async delete (req, res, next) {
        const _name = req.body.name; 
        const service = await ServiceM.findOne({name: _name})
    
        if (!service)
            return res.status(404).json({message: "Not found"})


        await ServiceM.findOneAndDelete({name: _name})

        res.json({message: `${_name} is deleted successfully`})
    }
}

module.exports = new ServiceController()