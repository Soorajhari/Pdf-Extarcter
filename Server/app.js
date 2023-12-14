const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors=require('cors')
const dotenv=require("dotenv")
dotenv.config()
const connectToMongoDB=require("./src/utils/db")
const Router= require("./src/routes/pdfRoute")
const app = express();
const port=process.env.PORT ||8080
console.log(port)

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use('src\\public\\pdFiles\\',express.static("pdFiles"))

app.use("/",Router)

connectToMongoDB().then(()=>{
    app.listen(port,()=>{
        console.log(`server started on  port ${port}`)
    })
}) .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });


