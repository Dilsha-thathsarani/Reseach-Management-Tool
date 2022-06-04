import pendingUsers from '../models/pendingUser.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const pendinguserCtrl={
pendingregister: async (req, res) => {
    const {name, email, password,mobile,user_role,
        research_area,reg_number
 
 } = req.body
    try {
        
        
        if(!name || !email || !password || !mobile || !user_role||!reg_number)
        return res.status(400).json({msg: "Please fill in all fields."})

        if(!validateEmail(email))
        return res.status(400).json({msg: "Invalid email."})

        const user = await pendingUsers.findOne({email})
        if(user) return res.status(400).json({msg: "This email is already exists."})

        if(password.length < 8)
            return res.status(400).json({msg: "Password must be at least 8 characters."})
        
    //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = new pendingUsers({name, email,password:passwordHash,mobile,user_role,
            research_area,reg_number})

        //const token = jwt.sign({id:newUser._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"1h"} )

        await newUser.save();

        res.json({result: newUser,msg:"Registration Successfull.Please wait for the admin approval!"})

    }catch (err){

        return res.status(500).json({msg:err.message})
    }
} ,

pendingallusers:async(req,res)=>{
    pendingUsers.find().exec((err,pendingUsers)=>{
          if(err){
              return res.status(400).json({
              error:err
             });
         }
            return res.status(200).json({
              success:true,
              existingpUser:pendingUsers
          });
      });
  },

  deletependingUser: async (req, res) => {
    let userId = req.params.id;
    try {
        await pendingUsers.findByIdAndDelete(userId)
        res.json({msg: "Request Rejected!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}
//Email address type validation
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
export default pendinguserCtrl;