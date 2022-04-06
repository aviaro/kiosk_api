const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const isAuth = require('./isAuth');
const User = require('../models/user');
const Store = require('../models/store');
const Category = require('../models/category');
const Product = require('../models/product');
router.post('/addCategory', isAuth, async(request,response) => {
    const accountId = request.account._id;
    const store = await Store.findOne({associateId: accountId});
    const categoryId = mongoose.Types.ObjectId();
    const { categoryName, categoryImage, priority } = request.body;
    const _category = new Category({
        _id: categoryId,
        storeId: store._id,
        categoryName: categoryName,
        categoryImage: categoryImage,
        priority: priority
    });
    _category.save()
    .then(category_created => {
        return response.status(200).json({
            status: true,
            message: category_created
        });
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        });
    })
});
router.put('/updateCategory/:categoryId', isAuth, async(request,response) => {

    const { categoryName, categoryImage, priority } = request.body;
    const cid = request.params.categoryId;

    Category.findById(cid)
    .then(category => {
        if(category){
            category.categoryName = categoryName;
            category.categoryImage = categoryImage;
            category.priority = priority;
            return category.save()
            .then(category_updated => {
                return response.status(200).json({
                    status: true,
                    message: category_updated
                });
            })
        } else {
            return response.status(200).json({
                status: false,
                message: 'Category not found'
            });
        }
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        });
    })
});
router.delete('/deleteCategory/:categoryId', isAuth, async(request,response) => {
    const cid = request.params.categoryId;
    Category.findByIdAndDelete(cid)
    .then(category_deleted => {
        return response.status(200).json({
            status: true,
            message: category_deleted
        })
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        })
    })
 });
router.post('/addProduct/:categoryId', isAuth, async(request,response) => {
    const ProductId = mongoose.Types.ObjectId();
    const accountId = request.account._id;
    const store = await Store.findOne({associateId:accountId});
    const categoryId = request.params.categoryId
    const {productName, price,unitInStock,desclimer,isAgeLimitation,imageSource,discount} = request.body;

    const _product = new Product({
        _id:ProductId,
        categoryId: categoryId,
        storeId:store._id,
        productName:productName,
        price: price,
        discount: discount,
        unitInStock: unitInStock,
        productImages:[
            {
                imageSource:imageSource
            }
        
        ],
        desclimer: desclimer,
        isAgeLimitation:isAgeLimitation,



    })
    return _product.save()
    .then(product_updated=>{
        return response.status(200).json({
            status: true,
            message: product_updated
        });

    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        });
    })

 });
router.put('/updateProduct/:productId', isAuth, async(request,response) => {
   const productId= request.params.productId;
   const product = await Product.findById({_id:productId});
   const {productName, price,unitInStock,desclimer,isAgeLimitation,imageSource,discount} = request.body;

   if(imageSource!=' '){

       product.productImages.push({imageSource:imageSource})

   }
   product.productName= productName;
   product.price=price;
   product.unitInStock=unitInStock;
   product.discount=discount;
   product.desclimer=desclimer;
   product.isAgeLimitation=isAgeLimitation
   return product.save()
   .then(product_updated => {
       return response.status(200).json({
           status: true,
           message: product_updated
       })


   })
   .catch(err=>{
    return response.status(200).json({
        status: false,
        message: err
    })
   })


 });
router.delete('/deleteProduct/:productId', isAuth, async(request,response) => {
    const pid = request.params.productId;
    Product.findByIdAndDelete(pid)
    .then(Product_deleted => {
        return response.status(200).json({
            status: true,
            message: Product_deleted
        })
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        })
    })
 });
router.get('/getAllCategories', isAuth, async(request,response) => {
    const accountId = request.account._id;
    const store = await Store.findOne({associateId: accountId});
    Category.find({storeId: store._id})
    .then(categories => {
        return response.status(200).json({
            status: true,
            message: categories
        });
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        });
    })
 });
 router.get('/getCategory/:categoryId', isAuth, async(request,response) => {
    const cid = request.params.categoryId;
    Category.findById(cid)
    .then(category => {
        return response.status(200).json({
            status: true,
            message: category
        });
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        });
    })
 });
router.get('/getAllProducts', isAuth, async(request,response) => {
    const accountId = request.account._id;
    const store = await Store.findOne({associateId: accountId});
    Product.find({storeId: store._id})
    .then(products => {
        return response.status(200).json({
            status: true,
            message: products
        });
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        });
    })
 });
 router.get('/getProductsByCategoryId/:categoryId', isAuth, async(request,response) => {
    const accountId = request.account._id;
    const categoryId = request.params.categoryId;
    const store = await Store.findOne({associateId: accountId});
    Product.find({storeId: store._id, categoryId: categoryId})
    .then(products => {
        return response.status(200).json({
            status: true,
            message: products
        });
    })
    .catch(err => {
        return response.status(500).json({
            status: false,
            message: err
        });
    })
 });


module.exports = router;