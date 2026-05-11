const express = require("express")
const access = require("../midleware/access")
const upload  = require("../midleware/uploadeMiddleware")
const router = express.Router()

const {createUser,login,createProduct,updateProduct,deleteProduct,get,getone,createProducts,updateProducts, filter} = require("../controler/usercontrol")

router.post("/createUser",createUser)
router.post("/login",login)
router.post("/createProduct",upload.array("image",5),createProduct)
router.post("/createProducts",upload.fields([{ name: "thumpnail", maxCount: 1 },{ name: "image", maxCount: 4 }]),createProducts)
router.put("/updateProducts/:id",upload.array("image",5),updateProducts)


router.get("/get",get)
router.get("/getone/:id",getone)
router.put("/updateProduct",access, updateProduct)
router.delete("/deleteProduct",access, deleteProduct)

router.get("/filter", filter)


module.exports = router


