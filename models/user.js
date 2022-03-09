const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose')
const schema  =moongoose.Schema;


const userschema = new schema ({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    CreatedAt:{type: Date ,default: Date.now},
    password: String,
    mobile:String,
    avatar: {type: String, default: "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"},
    firstname: String,
    lastName: String,
    passcode :Number,
    isBusiness: {type: Boolean, default: false},
    isApproved: {type: Boolean, default: false},
    isLocked: {type: Boolean, default: false},

})

module.exports = mongoose.model('user',userschema)