const express = require('express');
const app = express();
const router = express.Router();
const providerModel = require('../Models/providerModel')

router.get('/', async (req, res) => {
    try{
        const data = await providerModel.find();
        res.status(200).json(data)
    } catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Failed to fetch services"})
    }
});

module.exports = router;