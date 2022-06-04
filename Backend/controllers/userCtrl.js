import Users from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userCtrl={

    register: async (req, res) => {
        const {name, email, password,mobile,user_role,
            research_area,reg_number
     
     } = req.body
        try {
            
            
            if(!name || !email || !password || !mobile || !user_role||!reg_number)
            return res.status(400).json({msg: "Please fill in all fields."})

            if(!validateEmail(email))
            return res.status(400).json({msg: "Invalid email."})

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "This email is already exists."})

            if(password.length < 8)
                return res.status(400).json({msg: "Password must be at least 8 characters."})
            
        //Encrypt the password
            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new Users({name, email,password:passwordHash,mobile,user_role,
                research_area,reg_number})

            const token = jwt.sign({id:newUser._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"1h"} )

            await newUser.save();

            res.json({result: newUser, token,msg:"Registration Successfull.Please login to continue!"})

        }catch (err){

            return res.status(500).json({msg:err.message})
        }
    } ,

    accept: async (req, res) =>{
        try {
            const {name, email,password,mobile,user_role,
                research_area,reg_number} = req.body;

            const newUser = new Users({
                name, email,password,mobile,user_role,
                research_area,reg_number
            })
            const token = jwt.sign({id:newUser._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"1h"} )
            await newUser.save()
            res.json({result: newUser, token,msg:"Account approved!"})
    
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
        
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const token = jwt.sign({id:user._id}, process.env.REFRESH_TOKEN_SECRET,{expiresIn:"1h"} )

            res.status(200).json({result: user, token,msg: "Login success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    resetPassword: async (req, res) => {
        let userId = req.params.id;
        try {
            const {password} = req.body
            
            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate(userId, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getUserInfor: async (req, res) => {
        let userId = req.params.id;
        try {
            const user = await Users.findById(userId).select('-password')
            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteUser: async (req, res) => {
        let userId = req.params.id;
        try {
            await Users.findByIdAndDelete(userId)
            res.json({msg: "Profile Deleted!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateUser: async (req, res) => {
        let userId= req.params.id;
        const {name,email,avatar,mobile,user_role,research_area,reg_number} = req.body
        const update = {name,email,avatar,mobile,user_role,research_area,reg_number} 
        try {
            await Users.findByIdAndUpdate(userId,update)
            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    allusers:async(req,res)=>{
        Users.find().exec((err,Users)=>{
              if(err){
                  return res.status(400).json({
                  error:err
                 });
             }
                return res.status(200).json({
                  success:true,
                  existingUser:Users
              });
          });
      },
      panelMembers:async(req,res)=>{
        let r_area=req.params.id;
        Users.find({research_area:r_area,user_role:"Panel Member"}).exec((err,Users)=>{
              if(err){
                  return res.status(400).json({
                     error:err
                 });
             }
                return res.status(200).json({
                  success:true,
                  existingUser:Users
              });
          });
    },
}

//Email address type validation
function validateEmail(email) {
const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default userCtrl;