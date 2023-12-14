const mongoose = require('mongoose');

async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/PdfData', {
      
    });
        console.log('Connected to MongoDB hi every');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

module.exports= connectToMongoDB 