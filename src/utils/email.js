const nodemailer = require("nodemailer")


const sendEmail = async (to,subject,html)=>{
    try{
            await nodemailer.createTransport({
            service : "gmail",
            auth :{
                user : process.env.EMAIL_NAME,
                pass: process.env.EMAIL_PASSWORD
            }
        }).sendMail({ from : process.env.EMAIL_NAME, to, subject, html })

    }catch(error){
        console.log(error.message)
    }
}

module.exports = sendEmail