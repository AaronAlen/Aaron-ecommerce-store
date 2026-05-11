const jwt = require("jsonwebtoken")

const generateToken = (user)=>{
    return jwt.sign(
        {
            name : user.name,
            email : user.email,
            access : user.access
        },
        process.env.SIGNATURE,
        {expiresIn : "1d"}
    )
}

module.exports = generateToken