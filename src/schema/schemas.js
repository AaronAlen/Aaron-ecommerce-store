const mongoose = require("mongoose");
const { v4 } = require("uuid");

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      ref: "products",
    },

    quantity: Number,

    selectedVariant: {
      color: String,

      size: {
        type: String,
        enum: ["s", "m", "l", "xl", "xxl"],
      },
    },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },

    userId: {
      type: String,
      ref: "Auth",
    },

    items: [cartItemSchema],

    totalAmount: Number,

    totalQuantity: Number,
  },
  { timestamps: true },
);

const cart = mongoose.model("Cart", cartSchema);





const product = new mongoose.Schema({
    productId : String,
    count : Number
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
    cart : [product]
})

const auths = mongoose.model("auths", userschema)


module.exports = {cart,auths}