const bcrypt = require("bcrypt");
const userModel = require("../model/user");
const otpModel=require("../model/otp")
const jwt =require('jsonwebtoken')
const nodemailer=require('nodemailer')
const dotenv=require('dotenv')
dotenv.config()
const Asecret = process.env.SECRET_TOKEN || "";
const Rsecret = process.env.SECRET_RTOKEN || "";
console.log(Asecret);
console.log(Rsecret);


const creatUser = async (req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body.userData;//getting the user data
  console.log(req.body);
  const salt = 10;
  console.log(salt);

  const hashPassword = bcrypt.hashSync(password, salt);
  console.log(hashPassword);

  try {
    const user_email = await userModel.findOne({ email: email });//check for an exixiting user

    if (user_email) {
      return res.json({
        status: "error",
        message: "This email is already registered.",
      });
    }

    const user = new userModel({
      firstName,
      lastName,
      email,
      mobile,
      password: hashPassword,
    });

    await user.save();// save it in the database

    res.json({
      status: "ok",
      _id: user._id,
      message: "User Signup Successfully!",
    });
    await sendOtp(email);
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Duplicae email or Network error" });
  }
};

const sendOtp = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);// creating a random number
  const transporter = nodemailer.createTransport({// here using nodemailer for sending otp
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "soorajhari1999@gmail.com",
      pass: "tnbf dqhr uewp raxu",
    },
  });
  const mailOptions = {
    from: "soorajhari1999@gmail.com",
    to: email,
    subject: "Hello",
    text: "you otp here !",
    html: `${otp}`,
  };
  const newOTP = new otpModel({
    otp,
    email,
  });
  await newOTP.save();// save otp in database

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const resendOtp = async (req, res) => {
  let otp = Math.floor(100000 + Math.random() * 900000);
  const email = req.body.email;// getting otp from clientside
  console.log(email);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "soorajhari1999@gmail.com",
      pass: "tnbf dqhr uewp raxu",
    },
  });
  const mailOptions = {
    from: "soorajhari1999@gmail.com",
    to: email,
    subject: "Hello",
    text: "you otp here !",
    html: `${otp}`,
  };
  const newOTP = new otpModel({
    otp,
    email,
  });
  await newOTP.save();// save in database

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.json({ status: "ok", message: "otp send successfully" });
    }
  });
};

const verifyOtp = async (req, res) => {// otp verififcation
  try {
    const otp = req.body.Otp;
    console.log(otp);

    const newotp = otp.join("");
    console.log(typeof newotp);

    const savedOtp = await otpModel.findOne({ otp: newotp });// find the otp from database

    console.log(typeof savedOtp?.otp);
    if (!savedOtp) {
      res.json({
        status: "Invalid otp",
        message: " otp is invalid, please try again",
      });
      console.log("not");
      return;
    } else if (savedOtp.otp === newotp) {
      console.log("sucess");
      await userModel.updateOne({ email: req.body.email }, { status: 'verified' });// if verified chnage the user stataus feild to "verified"
      res.json({ status: "ok", message: "Otp verified succesfully" });
    } else {
      res.json({ status: "Invalid otp", message: "otp is invalid try again" });
      console.log("error");
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "An error occured please try again later",
    });
  }
};

const userLogin = async (req, res) => {// checking user credentials
  const { email, password } = req.body;

  console.log(email, password);
  const user = await userModel.findOne({ email: email });
  console.log(user);

  if (!user) {
    res.json({ status: 404, message: "user not found" });
    return;
  }else if(user.status!== "verified"){
    res.json({status:"error",message:"not authenticated"})
  }
  
  else {
    try {
      const passowrdMatch = await bcrypt.compare(password, user.password);// compare passwords

      if (!passowrdMatch) {
        res.json({ status: 404, message: "wrong password or inavlid email" });
        return;
      }

      const access_token = jwt.sign(    // cretaing access token
        { _id: user._id, emai: user.email },
        "scientistsree",
        {
          expiresIn: "50s",
        }
      );

      const refresh_token = jwt.sign( //cretae refresh token
        { _id: user._id, email: user.email },
        "scientistsooraj",
        { expiresIn: "7d" }
      );

      console.log(refresh_token);

      res.status(200).json({
        status: "ok",
        _id: user._id,
        accesstoken: access_token,
        refreshtoken: refresh_token,
        role: user.role,
        subrole: user.subrole,
        firstName: user.firstName,
        email: user.email,
        message: "login successfully",
      });
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({
          status: "error",
          message: "An error occured plaese try again",
        });
    }
  }
};


const generateAcessToken = (req, res) => {          //here create new accesstoken when previous is expired
  try {
    const refreshtoken = req.body.refreshtoken;   //getting refreh token 
    console.log(refreshtoken+"hi sooraj")
    if (!refreshtoken) {
      return res.status(400).json({ msg: "Please login again." });
    }

    jwt.verify(
      refreshtoken,
      Rsecret,
      async (err, result) => {
        if (err) {
          res.status(400).json({ msg: "Please login again." });
        }
        const user = await userModel.findById(result._id);

        if (!user) {
          res.status(400).json({ msg: "User does not exist." });
        }
        const access_token = jwt.sign(
          { _id: user?._id, emai: user?.email },
          Asecret,
          {
            expiresIn: "50s",
          }
        );
        res.json({status:"refreshtoken send successfully" ,access_token, user });
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ status: "error", message: "An error occured please try again" });
  }
};



module.exports = { creatUser ,resendOtp,verifyOtp,userLogin,generateAcessToken};
