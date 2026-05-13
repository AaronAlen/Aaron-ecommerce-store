const mongoose = require("mongoose")
const ogProducts = require("../schema/ogProducts")
const userSchema = require("../schema/userSchema")
const jwt = require("jsonwebtoken")
const users = require("../schema/userSchema")
const { auths } = require("../schema/schemas")


const findProduct = async(req,res)=>{
    console.log("hi");
    // const data = await ogProducts.find().skip(0).limit(30).lean()
    const data = await ogProducts.aggregate([{
        $group : { _id : "$category",data : {$first : "$$ROOT"}}},
        {$replaceRoot : {newRoot : "$data"}}
    ])
    console.log(data);
    // const data = await ogProducts.find()

    // console.log(data);
    res.json({
        data
    })
}


const findSome = async(req,res)=>{
    console.log("his");
    let category = req.body.category
    console.log(category);
    const data = await ogProducts.find({category : {$in :category}})
    console.log(data);
    res.json({
        data
    })
}


const findOne = async (req,res)=>{
    const data = await ogProducts.find({id : req.params.id})
    res.json({data})
}



const addToCart = async(req,res)=>{
    console.log(req.user);
    const user = await userSchema.findOne({email: req.user.email})
    user.cart.push({productId : req.params.id, count : 1})
    console.log(user);
    await user.save()
    res.json({message : "product added to your cart"})
}

const goToCart = async(req,res)=>{
    const user = await userSchema.findOne({email : req.user.email})
    // const user = await userSchema.findById(id._id)
    console.log(user);
    const cart = user.cart.map((product)=>product.productId)
    const count = user.cart.map((product)=>product.count)
    console.log(cart);
    const data = await ogProducts.find({_id : {$in : cart}})
    console.log(data);
    res.json({message:"data fetched successfully",data,count})

}

const saveProducts = async(req,res)=>{
    let user = await userSchema.findOne({email : req.user.email})
    console.log(req.body.details);
    console.log(user);
    user.cart = req.body.details
    await user.save()
    console.log(user);
    res.json("products saved successfully")
}



const orderConfirmed = async (req,res)=>{
    console.log(req.body);
    console.log(req.user);
    let user = await users.findOne({email : req.user.email})
    console.log(user);
    user.orders.push(req.body)
    await user.save()
    console.log(user);
    res.status(200).json("success")
}

const goToOrders = async (req,res)=>{
    console.log("hi");
    let email = req.user.email
    console.log(email);
    let data = await users.aggregate([
        {
            $match : {
                email
            }
        },{
            $unwind : "$orders"
        },
        {
            $project : {
                _id : 0,
                "count" : "$orders.count",
                "img" : "$orders.img",
                "status" : "$orders.status",
                "title" : "$orders.title"
            }
        }

    ])
    console.log(data);
    res.json(data)
}

const newOrders = async (req,res) => {
    const data = await users.aggregate([
        {
            $unwind : "$orders"
        },
        {
            $group : {
                _id : {
                    $toObjectId: "$orders.productId"
                },
                quantity : {$sum : "$orders.count"}
            }
        },     
        {
            $lookup : {
                from : "ogproducts",
                localField : "_id",
                foreignField : "_id",
                as : "productDetails"
            }
        },
        {
            $unwind : "$productDetails"
        },
        // {
        //     $sort : {
        //         "$orders.createdAt" : 1
        //     }
        // }
    ])
    res.json({data})
}

const cartOrderConfirmed = async (req,res)=> {
    console.log("hi");
    let user = await users.findOne({email : req.user.email})
    console.log(user);
    let productData = await users.aggregate([
        {
            $match : {
                email : req.user.email
            }
        },
        {
            $unwind : "$cart"
        },
        {
            $lookup : {
                from : "ogproducts",
                localField : "cart.productId",
                foreignField : "_id",
                as : "productDetails"
            }
        },
        {
            $unwind : "$productDetails"
        },
        // {
        //     $unwind : "$productDetails.images"
        // },
        {
            $project : {
                "productId" : "$cart.productId",
                "count" : "$cart.count",
                "image" : {
                $arrayElemAt : ["$productDetails.images",0]
                },
                "title" : "$productDetails.title"
            }
        }
    ])
    console.log("product data" ,productData);
    console.log(req.body);
    productData.forEach(product=>{
    user.orders.push({productId : product.productId,count : product.count, img : product.image, title : product.title, address : req.body.address})
    })
    await user.save()    
    res.json(productData)
}

const viewOrders = async (req,res)=>{
    console.log(req.params.id);
    let data = await users.aggregate([
        {
            $unwind : "$orders"
        },
        // {
        //     $group : {
        //         _id : {
        //             $toObjectId: "$orders.productId"
        //         } 
        //       }
        // },
        {
            $match : {
                "orders.productId" : req.params.id
            }
        },
        {
            $lookup : {
                from : "ogproducts",
                localField : "cart.productId",
                foreignField : "_id",
                as : "productDetails"
            }
        },
        {
            $unwind : "$productDetails"
        },
        {
            $project : {
                "id" : "$orders.productId",
                "count" : "$orders.count",
                "email" : "$email",
                "adress" : "$orders.address",                
                "productId" : "$cart.productId",
                "image" : {
                $arrayElemAt : ["$productDetails.images",0]
                },
                "title" : "$productDetails.title"
            }
        }
    ])
    console.log(data);
    res.json({data})
}

module.exports = {findProduct,findSome,findOne,addToCart,goToCart,saveProducts,orderConfirmed,goToOrders,newOrders,cartOrderConfirmed,viewOrders}