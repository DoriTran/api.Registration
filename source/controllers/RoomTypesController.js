const RoomTypesM = require('../models/RoomTypes')


class RoomTypesController{
    async getAll (req, res, next) {
        const types = await RoomTypesM.find({})
        res.json(types)
    }

    async add (req, res, next) {
        const _type = req.body.type; 
        const roomType = await RoomTypesM.findOne({type: _type})
    
        if (roomType)
            return res.status(406).json({message: "This type already exists"})

        await RoomTypesM.create({type: _type})

        res.json({message: `${_type} is created successfully`})
    }

    async update (req, res, next) {
        const oldType = req.body.oldType; 
        const newType = req.body.newType; 
        const roomType = await RoomTypesM.findOne({type: oldType})
        const newRoomType = await RoomTypesM.findOne({type: newType})
    
        if (!roomType)
            return res.status(404).json({message: "Not found"})

        if (newRoomType && newType !== oldType)
            return res.status(406).json({message: "This room type already exists"})

        await RoomTypesM.findOneAndUpdate({type: oldType}, {type: newType})

        res.json({message: `${newType} is updated successfully`})
    }

    async delete (req, res, next) {
        const _type = req.body.type; 
        const roomType = await RoomTypesM.findOne({type: _type})
    
        if (!roomType)
            return res.status(404).json({message: "Not found"})

        await RoomTypesM.findOneAndDelete({type: _type})

        res.json({message: `${_type} is deleted successfully`})
    }
    
}

module.exports = new RoomTypesController()