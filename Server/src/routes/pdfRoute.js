const express =require('express')
const Router=express.Router()
const upload=require("../middleware/multer")
const pdfController=require("../controllers/file")
const authController=require("../controllers/auth")

Router.post("/upload-pdf",upload.single('files'),pdfController.getFile)
Router.get("/details/:id",pdfController.fileData)
Router.post("/extract",pdfController.extarctedFile)
Router.post("/signup",authController.creatUser)



module.exports=Router