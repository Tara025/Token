import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import { createToken } from "../lib/auth.js"; 

export async function createUserController (req, res) {
    try {
        const saltRound = 12;
        const salt = await bcrypt.genSalt(saltRound)
        const hashedSaltedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedSaltedPassword;

        const newUser = userModel(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    }catch (error) {
        res.status(500).json(error);
    }
}


export async function loginUserController (req, res) {
    try {
      
        const user = await userModel.findOne({email: req.body.email});
        console.log ({user})

        if (user){
            const isMatching = await bcrypt.compare(req.body.password, user.password);
            console.log(isMatching)
            if (isMatching){
                const token = await createToken({customerId: user.customerId, userId: user._id});
               
                return res.status(200).cookie("jwt", token, {httpOnly: true}).json({msg: "login successful!"});
            }

            return res.status(401).json({message: "Access denied! Invalid credentials."})

        }

        return res.status(404).json({message: "User not found!"});


      
        res.status(201).send("ok, login");

    }catch (error) {
        res.status(500).json(error);
    }
}