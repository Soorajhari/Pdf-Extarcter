    const bcrypt=require("bcrypt") 
    const userModel=require('../model/user')

    


const creatUser = async (req,res )=> {
    const { firstName, lastName, email, mobile, password, } =
      req.body.userData;
    console.log(req.body);
    const salt = 10;
    console.log(salt);
  
    const hashPassword = bcrypt.hashSync(password, salt);
    console.log(hashPassword);
          
    try {
  
      const user_email = await userModel.findOne({ email:email });

      if (user_email) {
        return  res.json({ status:"error" ,message: "This email is already registered." });
      }
  
  
      const user = new userModel({
        firstName,
        lastName,
        email,
        mobile,
        password: hashPassword,
        
      });

      await user.save();
      
      res.json({
        status: "ok",
        _id: user._id,
        message: "User Signup Successfully!",
      });
      // await sendOtp(email);
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "Duplicae email or Network error" });
    }
  };


  module.exports={creatUser}