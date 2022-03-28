const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuth = require('./isAuth');
const store = require('../models/store');
const user = require('../models/user');


router.post('/createStore', isAuth, async(request, response) => {
    
  const referIDfromUser = request.account._id;
    //checking if store already exists
    const IsStoreExists = await store.findOne({referIDfromUser: referIDfromUser});
    if(IsStoreExists) {
        return response.status(200).json({
            message: 'Store already exists one per user'
            

        })
    }
    else
    const storeID = mongoose.Types.ObjectId();
    const {
        storeName,
        storeDescription,
        isDelivery,
        email,
        mobile,
        city,
        address,
        latitude,
        longtitude

    } = request.body;
    // adding new 
    const newstore = await user.findById(referIDfromUser)
    newstore.isBusiness = true;
    return account.save()
    .then(account_updated =>{
        
        const _store =new store({
            _id=storeID,
            associatedId:referIDfromUser,
            storename: storeName,
            storeDescription: storeDescription,
            isDelivery:isDelivery,
           contactInfo:{ 
            email: email,
            mobile:mobile,
            city: city,
            address:address,
            latitude: latitude,
            longtitude: longtitude,
             },
             workingHours:[],
             reviews:[],
             subs:[],
    
        });
        return _store.save()
        .then(store_created=>{
            return response.status(200).json({
                message: account_updated,
                
            });
        })




    })




  }

})


module.exports = router;