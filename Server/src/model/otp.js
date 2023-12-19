const mongoose=require("mongoose")


const otpSchema=new mongoose.Schema ({
        otp: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: '20m'
        },
        email:{
            type:String,
            required:true
        }

})


 const otpModel=mongoose.model('Otp',otpSchema)

module.exports= otpModel
