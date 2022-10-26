const BillM = require('../models/Bill')

class BillController{
    async getAll (req, res, next){
        try {
            const bills = await BillM.find({})
            res.status(200).json(bills)
        } catch (error) {
            res.status(501).json({message:"Interal server error"})
        }
    }

    async getBillById (req, res, next){
        try {
            const bills = await BillM.find({_id: req.query.id})
            res.status(200).json(bills)
        } catch (error) {
            res.status(501).json({message:"Internal server error"})
        }
    }

    async addBill (req, res, next){
        const bill = {
            customerName: req.body.customerName,
            roomName: req.body.roomName,
            from: req.body.from,
            createdBy: req.body.createdBy,
            to: req.body.to,
            total: req.body.total,
        }
        try {
            // const bills = await BillM.find({_id: req.query.id})
            const newBill = new BillM(bill)
            const response = await newBill.save()
            return res.status(200).json(response)
        } catch (error) {
            res.status(501).json({message:"Internal server error"})
        }
    }
}

module.exports = new BillController()