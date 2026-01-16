import {prisma} from "../config/db.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generatetoken.js";

export const register = async (req,res) => {
    const {name,email,password} = req.body;
    

    // check if user already exists

    const userExists = await prisma.user.findUnique({
        where:{email:email},
    });

    if(userExists){
        return res.status(400).json({error:"User already exists with this email"}); 
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);

    //create user
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
        },
    });
    return res.status(201).json({
        status:"success",
        data:{
            id:user.id,
            name:name, 
            email:email,
        }
    })

};

export const login = async(req,res)=>{
    const {email,password}=req.body;

    const userExists = await prisma.user.findUnique({
        where:{email:email},
    });

    if(!userExists){
        return res.status(400).json({error:"Invalid email or password"}); 
    }
    
    //verify password
    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if(!isPasswordValid){
        return res.status(400).json({error:"Invalid email or password"}); 
    }

    //generate JWT token
    const token = generateToken(userExists.id,res);



    return res.status(200).json({
    status: "success",
    token,                // 👈 TOKEN SENT HERE
    user: {
        id: userExists.id,
        email: userExists.email,
    },
    });
};

export const logout = async (req,res) => {
    res.cookie("jwt","",{
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({
        status:"success",
        message: "Logged out successfully",
    });
};
