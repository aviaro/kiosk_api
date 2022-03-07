const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/sayhello',(req,res) =>{
    return res.status(200).json({
        message:'hello from kiosk api'
    });
})



module.exports = router;

