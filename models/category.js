const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose')
const schema  =moongoose.Schema;


const categorySchema = new schema ({
    _id: mongoose.Schema.Types.ObjectId,
    CategoryName: String,
    CategoryImage: {type: String, default: "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"},
    StoreId:{type: mongoose.Schema.Types.ObjectId,ref:"store"},
    position:Number
});

module.exports = mongoose.model('category',categorySchema)