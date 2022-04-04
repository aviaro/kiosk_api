const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const isAuth = require('./isAuth');

const User = require('../models/user');
const Store = require('../models/store');
const Category = require('../models/category');
const Product = require('../models/product');



router.post('/addCategory', isAuth, async(request,response) => {
    const userid= request.account._id;
    const store = await Store.findOne({associateId:userid})    
    const{
        categoryName,
        categoryImage, 
        priority      
    } = request.body;

    const _category = new Category({
        _id: mongoose.Types.ObjectId(),
        storeId: store._id,
        categoryName: categoryName,
        categoryImage: categoryImage,
        priority: priority
    })
    return _category.save()
    .then(newCategory => {
        return response.status(200).json({
            category: newCategory
        })
    })
    .catch(err => {
        response.status(500).json({
            message: err
        })
    })

});
router.put('/updateCategory/:categoryId', isAuth, async(request,response) => { 
    const{
        categoryName,
        categoryImage, 
        priority      
    } = request.body;
    const cid = request.params.categoryId;
    await Category.findById(cid)
    .then(category => {
        if(category)
        {
            category.categoryName=categoryName;
            category.categoryImage=categoryImage;
            category.priority=priority;
            category.save()
            return category.save()
            .then(categoryupdated => {
                return response.status(200).json({
                    status: true,
                    message: categoryupdated
                });
        
            })
        }
        else
        {
            return response.status(403).json({
                status: false,
                message:'category not found'
            });

        }
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            error:err
        })
    })
   
    
    

});
router.delete('/deleteCategory', isAuth, async(request,response) => { 


});
router.post('/addProduct', isAuth, async(request,response) => { });
router.put('/updateProduct', isAuth, async(request,response) => { });
router.delete('/deleteProduct', isAuth, async(request,response) => {
    
 });
router.post('/getallcategories', isAuth, async(request,response) => {
    const accountId = request.account._id;
    const store = await Store.findOne({associateId: accountId})
    category.find({storeId: store._id})
    .then(categories => {
        return response.status(200).json({
            status: true,
            massege: categories
        })
    })
    .catch(error => {
        return response.status(200).json({
            status: false,
            messege:error.message
        })
    })
})
router.get('/getCategory/:categoryId', isAuth, async(request,response) => {    
    const categoryId = request.params.categoryId;
    await Category.findById(categoryId)
    .then(category => {
        response.status(200).json({
            Categoty: category
        })
    })
    .catch(err => {
        return response.status(403).json({
            message: 'Category not found'
        })
    })
    

})

module.exports = router;