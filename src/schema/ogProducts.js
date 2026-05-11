const mongoose = require("mongoose")
const {v4: uuidv4, stringify} = require("uuid")

const meta = new mongoose.Schema({
    // createdAt : String,
    // updatedAt : String,
    barcode : String,
    qrCode : String
},{timestamps :true})

const dimensions = new mongoose.Schema({
    depth : Number,
    height : Number,
    width : Number
})

const reviews = new mongoose.Schema({
    rating : Number,
    comment : String,
    date : String,
    reviewerName : String,
    reviewerEmail : String
})





const ogproducts = new mongoose.Schema({
    id : {
        type : Number
    },
    title : {
        type : String,
    },
    description : {
        type : String
    },
    category : {
        type : String
    },
    price : {
        type : Number
    },
    discountPercentage : {
        type : Number
    },
    rating : {
        type : Number
    },
    stock : {
        type : Number
    },
    tags : [String],
    brand : String,
    sku : {
        type : String
    },
    weight : {
        type : Number
    },
    dimensions : dimensions,
    warrantyInformation : {
        type : String
    },
    shippingInformation : {
        type : String
    },
    availabilityStatus : {
        type : String
    },
    reviews : [reviews],
    returnPolicy : {
        type : String
    },
    minimumOrderQuantity : {
        type : Number
    },
    meta : meta,
    images : [String],
    thumbnail : {
        type : String
    }
},{timestamps : true})

const ogProducts = mongoose.model("ogProducts", ogproducts)

module.exports = ogProducts