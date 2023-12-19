const express =require('express')
const Router=express.Router()
const upload=require("../middleware/multer")
const pdfController=require("../controllers/file")
const authController=require("../controllers/auth")
const authenticated=require("../middleware/authenticationChecker")

Router.post("/upload-pdf",authenticated.verify,upload.single('files'),pdfController.getFile)
Router.get("/details/:id", authenticated.verify, pdfController.fileData)
Router.post("/extract" , authenticated.verify, pdfController.extarctedFile)
Router.post("/signup",authController.creatUser)
Router.post("/login",authController.userLogin)
Router.post('/otp',authController.verifyOtp)
Router.post('/resend_otp',authController.resendOtp)
Router.post('/refresh',authController.generateAcessToken)




module.exports=Router