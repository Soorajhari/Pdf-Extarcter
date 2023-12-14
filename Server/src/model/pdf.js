const mongoose=require("mongoose")

const  PdfSchema= new mongoose.Schema({
    fieldname:String,
    originalname: String,
    encoding:String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
})

const PdfModel = mongoose.model('Pdf', PdfSchema);

module.exports = PdfModel;

