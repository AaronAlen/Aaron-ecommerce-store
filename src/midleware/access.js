const jwt = require("jsonwebtoken")


const access = async(req,res,next)=>{
    
    if(!req.headers.authorization)res.json({message : "token not provided"})
    else{
        req.user = await jwt.verify(req.headers.authorization.split(" ")[1],process.env.SIGNATURE)
        if(req.user.access == "admin") next()
        else res.json("access denied")
    }

}

module.exports = access