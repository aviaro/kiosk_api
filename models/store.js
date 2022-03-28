const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose')
const schema  =moongoose.Schema;


const storeSchema = new schema ({
    _id: mongoose.Schema.Types.ObjectId,
    associatedId:{ type: mongoose.Schema.Types.ObjectId,ref:"user" },
    contactInfo:{
        email: String,
        mobile:String,
        phone:String,
        city:String,
        address:String,
        latitude:String,
        longtitude:String
    },
    workingHours:[
        { 
            day: number,fromHour: String,toHour:String,IsOpen:Boolean
        }
    ],
    reviews:[
        {
            accountId:{ type: mongoose.Schema.Types.ObjectId,ref:"user"},
            reviewContext: String,
            CreatedAt:{type: Date ,default: Date.now},
            rank:Number,
            IsPublished:Boolean
        }
    ],
    subs:[
        {
            associatedId:{type: mongoose.Schema.Types.ObjectId,ref:"user"}
        }
    ],
    storeDescription: String,
    IsTakeaway: Boolean,
    IsDelivery: Boolean,
    CreatedAt:{type: Date ,default: Date.now},
    UpdatedAt:{type: Date ,default: Date.now},
    mobile:String,
    logo: {type: String, default: "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"},
    isLocked: {type: Boolean, default: false},

})

module.exports = mongoose.model('user',storeSchema)