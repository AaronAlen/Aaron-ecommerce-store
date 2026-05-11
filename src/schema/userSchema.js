const mongoose = require("mongoose")

const address = new mongoose.Schema({
    name : String,
    phone : Number,
    email : String,
    building : String,
    area : String,    
    city : String,
    state : String,
    pincode : Number
})

const product = new mongoose.Schema({
    productId : String,
    count : Number
})

const orders = new mongoose.Schema({
    productId : String,
    count : Number,
    img : String,
    title : String,
    status : {
        type : String,
        enum : ["Ordered", "Packed", "Shipped", "Out for Delivery", "delivered", "Return"],
        default : "Ordered"
    },
    address : address
})

const userschema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    access : {
        type : String,
        enum : ["access","user", "admin"],
        default : "access"
    },
    cart : [product],
    orders : [orders]
})

const users = mongoose.model("users", userschema)

module.exports = users