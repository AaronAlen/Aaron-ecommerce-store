const express = require("express")
const {findProduct,findSome, addToCart, goToCart, saveProducts, orderConfirmed, goToOrders, newOrders, cartOrderConfirmed, viewOrders, shipped} = require("../controler/productController")
const { findOne } = require("../controler/productController")
const verifyToken = require("../midleware/verifyToken")
const aggregation = require("../controler/aggregate")
const productRouter = express.Router()

productRouter.get("/find",findProduct)
productRouter.post("/findSome",findSome)
productRouter.get("/findOne/:id",findOne)
productRouter.post("/addToCart/:id",verifyToken,addToCart)
productRouter.get("/goToCart",verifyToken,goToCart)
productRouter.post("/saveProducts",verifyToken,saveProducts)
productRouter.post("/orderConfirmed",verifyToken,orderConfirmed)
productRouter.get("/goToOrders",verifyToken,goToOrders)
productRouter.get("/newOrders",verifyToken,newOrders)

productRouter.post("/cartOrderConfirmed",verifyToken,cartOrderConfirmed)
productRouter.get("/viewOrders/:id",verifyToken,viewOrders)
productRouter.post("/shipped/:id/:email",verifyToken,shipped)

productRouter.get("/aggregate",aggregation)



module.exports = productRouter
