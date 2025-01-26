const express = require('express');
const app = express();
const router = express.Router();
const appointmentModel = require('../Models/appointmentModel')

router.get('/', async (req, res) => {
    const id = req.query.customerId;
    const status = req.query.status;
    try{
        const data = await appointmentModel.find({customerId: id, status: status});
        res.status(200).json(data)
    } catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Failed to fetch services"})
    }
});

module.exports = router;