const userModel=require("../model/user")
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config();

const Asecret = process.env.SECRET_TOKEN || "";
console.log(Asecret)

const verify = async (req, res,next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    console.log(token)
    if (!token) {
      return res.json({ msg: "You are not authorized" });
    }
    const decoded = jwt.verify(token, Asecret) 
    console.log(decoded+ "srerre");
    if (!decoded) {
      return res.status(401).json({ msg: "You are not authorized" });
    }

    const user = await userModel.findOne({ _id: decoded._id });
    console.log(user + "sooraj hari");
    if (!user) {
      return res.json({ msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ msg: "Token expired" });
    }else{
      console.log(error);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
};

module.exports={verify}
