const express = require("express")
const {findProduct,findSome, addToCart, goToCart, saveProducts, orderConfirmed, goToOrders, newOrders, cartOrderConfirmed, viewOrders, statusChange, userOrderCancel} = require("../controler/productController")
const { findOne } = require("../controler/productController")
const verifyToken = require("../midleware/verifyToken")
const aggregation = require("../controler/aggregate")
const access = require("../midleware/access")
const productRouter = express.Router()

productRouter.get("/find",findProduct)
productRouter.post("/findSome",findSome)
productRouter.get("/findOne/:id",findOne)
productRouter.post("/addToCart/:id",verifyToken,addToCart)
productRouter.get("/goToCart",verifyToken,goToCart)
productRouter.post("/saveProducts",verifyToken,saveProducts)
productRouter.post("/orderConfirmed",verifyToken,orderConfirmed)
productRouter.get("/goToOrders",verifyToken,goToOrders)
productRouter.post("/cartOrderConfirmed",verifyToken,cartOrderConfirmed)

productRouter.get("/newOrders/:status",access,newOrders)
productRouter.get("/viewOrders/:id/:status",access,viewOrders)
productRouter.post("/statusChange/:id/:email/:change",access,statusChange)


productRouter.post("/userOrderCancel/:id/:email/:change",verifyToken,userOrderCancel)


productRouter.get("/aggregate",aggregation)

module.exports = productRouter