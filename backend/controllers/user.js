// import { User } from "../models/userModel.js";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const Login = async(req,res)=>{
//     try {
//         const {email,password} = req.body;
//         if(!email || !password){
//             return res.status(401).json({
//                 message:"Invalid data",
//                 success:false
//             })
//         };
//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(401).json({
//                 message:"Invalid email or password",
//                 success:false
//             });
//         }

//         const isMatch = await bcryptjs.compare(password, user.password);
//         if(!isMatch){
//             return res.status(401).json({
//                 message:"Invalid email or password",
//                 success:false
//             });
//         }
//        const tokenData = {
//         id:user._id
//        }
//         // const token = await jwt.sign(tokenData, "dfbvdkjzfnvkjzdnfvkzdnjf",{expiresIn:"1h"});
//         const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1h" });


//         // return res.status(200).cookie("token", token).json({
//         //     message:`Welcome back ${user.fullName}`,
//         //     user,
//         //     success:true
//         // });
//         return res.status(200).cookie("token", token, {
//             httpOnly: true,
//             sameSite: 'Strict', // This restricts the cookie to same-site requests for security
//             secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
//             maxAge: 60 * 60 * 1000 // 1 hour
//         }).json({
//             message: `Welcome back ${user.fullName}`,
//             user,
//             success: true
//         });
        

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "An error occurred during login",
//             success: false,
//             error: error.message
//         });
//     }
// }

// export const Logout = async (req,res) => {
//     return res.status(200).cookie("token", "", {expires:new Date(Date.now()), httpOnly:true}).json({
//         message:"User logged out successfully.",
//         success:true,
//     });
// }

// export const Register = async (req,res) =>{
//     try {
//         const {fullName, email, password} = req.body;
//         if(!fullName || !email || !password){
//             return res.status(401).json({
//                 message:"Invalid data",
//                 success:false
//             })
//         }
//         const user = await User.findOne({email});
//         if(user){
//             return res.status(401).json({
//                 message:"This email is already used",
//                 success:false,
//             })
//         }

//         const hashedPassword = await bcryptjs.hash(password,16);

//         await User.create({
//             fullName,
//             email,
//             password:hashedPassword
//         });

//         return res.status(201).json({
//             message:"Account created successfully.",
//             success:true,
//         })

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "An error occurred during registration",
//             success: false,
//             error: error.message
//         });
//     }
// };




import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Invalid data",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }
        const tokenData = {
            id: user._id
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).cookie("token", token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000
        }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "An error occurred during login",
            success: false,
            error: error.message
        });
    }
}

export const Logout = async (req, res) => {
    return res.status(200).cookie("token", "", {
        expires: new Date(0),
        httpOnly: true,
        sameSite: 'Strict',
        secure: process.env.NODE_ENV === 'production'
    }).json({
        message: "User logged out successfully.",
        success: true,
    });
}

export const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "Invalid data",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "This email is already used",
                success: false,
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 16);

        await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "An error occurred during registration",
            success: false,
            error: error.message
        });
    }
};
