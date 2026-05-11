const multer = require("multer")
const path = require("path")
const fs = require("fs")

if(!fs.existsSync("upload/images"))fs.mkdirSync("upload/images",{recursive: true})

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"upload/images")
    },
    fileName : (req,file,cb)=>{
        const uniqueName = Date.now()+"-"+Math.round(Math.random()*1e9)
        cb(null,uniqueName+path.extname(file.originalname))
    }
})

const upload = multer({
    storage, 
    limits:{
        fileSize : 2*1024*1024
    }
})

module.exports = upload
