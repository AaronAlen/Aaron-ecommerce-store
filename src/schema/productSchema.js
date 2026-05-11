const mongoose = require("mongoose")
const { v4: uuidv4} = require("uuid")

const variant = mongoose.Schema({
    _id : false,
    color : {
        type : String
    },
    size : {
     type : String,
     enum : ["s", "m", "l", "xl", "xxl"],
     default : "xl"
    },
    stock : {
     type : Number  
    },
    price : {
        type : Number
    }
})



const review = new mongoose.Schema({
    rating : {
        type : Number
    },
    comment : {
        type : String,
    }
},
    {timestamps: true}
)


const productschema = new mongoose.Schema({
    _id : {
        type : String,
        default : uuidv4
    },
    name : {
        type : String,
        // required : true
    },
    description : {
        type : String,
        // required : true
    },
    price : {
        type : Number,
        // required : true,
        min : 1
    },
    category : {
        type : String,
        enum : ["grossery", "style", "bueaty"],
        default : "style"
    },
    stock : {
        type : Number
    },
    variants : [variant],
    reviews : [review],
    weight : {
        type : Number
    },
    length : {
        type : Number
    },
    width : {
        type : Number
    },
    height : {
        type : Number
    },
    freeShipping : {
        type : Boolean
    },
    thumpnail : [String],
    images : [String]

},{timestamps: true})

const products = mongoose.model("products" , productschema)
// const variants = mongoose.model("variants" , variant)
// const reviews = mongoose.model("reviews" , review)

module.exports = products


// {
//     "name" : "shoes",
//     "description"  : "foot to wear",
//     "price" :1500,
//     "category" : "style",
//     "stock" :10,
//     "variants" : [{"color" : "black", "size" :"l", "stock" :5, "price" :1200},{"color" : "white", "size" :"xl", "stock" :5, "price" :1200}],
//     "reviews" : [{"rating" :5, "comment" : "exelent"},{"rating" :1, "comment" : "poor"},{"rating" :3, "comment" : "good"}],
//     "weight" :500,
//     "length" :300,
//     "width" :100,
//     "height" :70,
//     "freeShipping" :true
// }