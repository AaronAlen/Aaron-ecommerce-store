const mongoose = require("mongoose")

const db = ()=>{
 try{
    mongoose.connect(process.env.DB)
.then(()=>console.log("db connected"))
 }
catch(error){console.log(error.message)}
}

module.exports = db

