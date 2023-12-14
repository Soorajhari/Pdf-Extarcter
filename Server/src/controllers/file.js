const PdfModel = require("../model/pdf");
const path = require("path");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const getFile = async (req, res) => {
  try {
    const {
      fieldname,
      originalname,
      encoding,
      mimetype,
      destination,
      filename,
      path,
      size,
    } = req.file;
    console.log(req.file);

    const pdfData = new PdfModel({
      fieldname,
      originalname,
      encoding,
      mimetype,
      destination,
      filename,
      path,
      size,
    });

    await pdfData.save();
    res.json({
      status: "ok",
      _id: pdfData._id,
      fieldname: pdfData.fieldname,
      originalname: pdfData.originalname,
      encoding: pdfData.encoding,
      mimetype: pdfData.mimetype,
      destination: pdfData.destination,
      filename: pdfData.filename,
      path: pdfData.path,
      size: pdfData.size,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fileData = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    if (!id) {
      return res.status(400).json({ error: "ID is missing" });
    }
    const pdfDetails = await PdfModel.findOne({ _id: id });
    if (!pdfDetails) {
      return res.status(404).json({error:"Pdf not found"});
    }

    const filePath = pdfDetails.path;
    const buffer = await fs.readFileSync(filePath);
    const base64Data = Buffer.from(buffer).toString("base64");
    res.json({
      status: "ok",
      data: base64Data,
      _id: pdfDetails._id,
      fieldname: pdfDetails.fieldname,
      originalname: pdfDetails.originalname,
      encoding: pdfDetails.encoding,
      mimetype: pdfDetails.mimetype,
      destination: pdfDetails.destination,
      filename: pdfDetails.filename,
      path: pdfDetails.path,
      size: pdfDetails.size,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const extarctedFile = async (req, res) => {
  try {
    const id = req.body._id;
    console.log(id + "sree");
    const selectedPages = req.body.selectedpages;
    if (!id && selectedPages) {
      return res.status(400).json({ error: "ID is missing" });
    }

    const pdfDetails = await PdfModel.findOne({ _id: id });
    
    if (!pdfDetails) {
      return res.status(404).json({error:"Pdf not found"});
    }
    const filePath = pdfDetails.filename;
    const uploadedPdfPath = `src/public/pdFiles/${filePath}`;
    const pdfDoc = await PDFDocument.load(fs.readFileSync(uploadedPdfPath)); //here using pdf-lib liberary

    const extractedPdfDoc = await PDFDocument.create();
    for (const pageNumber of selectedPages) {
      const [copiedPage] = await extractedPdfDoc.copyPages(pdfDoc, [
        pageNumber - 1,
      ]);
      extractedPdfDoc.addPage(copiedPage);
    }
    const extractedPdfBytes = await extractedPdfDoc.save();
    const base64Data = Buffer.from(extractedPdfBytes).toString("base64");
    console.log(extractedPdfBytes);
    res.json({ status: "ok", data: base64Data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getFile,
  fileData,
  extarctedFile,
};
