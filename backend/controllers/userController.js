import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import * as token from "../lib/auth.js";

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
            if (isMatching){
                //const //hier gehts morgen (Donnerstag mit Edwin) weiter
            }

        }
      
        res.status(201).json(savedUser);

    }catch (error) {
        res.status(500).json(error);
    }
}