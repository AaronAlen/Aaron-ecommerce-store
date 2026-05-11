const jwt = require("jsonwebtoken")

const verifyToken = async(req, res, next)=>{
    console.log(req.headers.authorization);
    if(!req.headers.authorization)res.json({message : "login first"})
    try{
    req.user = jwt.verify(req.headers.authorization.split(" ")[1], process.env.SIGNATURE)
    next()
    }
    catch(error){
        console.log("errors:",error.message);
        res.json({message: "login expired : please login again"})
    }

}

module.exports = verifyToken