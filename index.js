const express = require("express")
const path = require("path")
const app = express()
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const dns = require("dns")
const db = require("./src/config/db")
const cors = require("cors")
const ogProducts = require("./src/schema/ogProducts")
dotenv.config()

const router = require("./src/routes/routes")
const productRouter = require("./src/routes/productsRoutes")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(express.static("public"))
app.use(express.static(path.join(__dirname, "public")))


db()

// app.use(cors({
//     origin: "*"
// }))

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})




app.use("/api", router)
app.use("/product", productRouter)




app.listen(process.env.PORT,"0.0.0.0", ()=>console.log(`port running on ${process.env.PORT}`))


// {
//   "name" : "aaron",
//   "email" : "aaronbca123@mail.com",
//   "access" : "admin"
// }

// {
//   "name" : "BUMA",
//   "new_name" : "NICK"
// }


// async function product(){
//     const data = await fetch(`https://dummyjson.com/products?limit=194`)
//     const datas = await data.json()
//     console.log(datas.products[0].meta)
//     datas.products.forEach(async(product) => {
//         let {id, title, description, category, price, discountPercentage, rating, stock, tags, brand, sku, weight, dimensions, warrantyInformation, shippingInformation, availabilityStatus, reviews, returnPolicy, minimumOrderQuantity, meta, images, thumbnail} = product
//         await ogProducts.create({
//             id, 
//             title, 
//             description, 
//             category, 
//             price, 
//             discountPercentage, 
//             rating, 
//             stock,
//             tags,
//             brand, 
//             sku, 
//             weight, 
//             dimensions, 
//             warrantyInformation, 
//             shippingInformation, 
//             availabilityStatus, 
//             reviews, 
//             returnPolicy, 
//             minimumOrderQuantity, 
//             meta, 
//             images, 
//             thumbnail
//         })        
//     });

// }

// product()
