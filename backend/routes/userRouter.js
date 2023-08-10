import express from "express";
import { createUserController } from "../controllers/userController.js";
import { loginUserController } from "../controllers/userController.js";
import { getAllUsersController } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
// import  * as user from "../controllers/userController";

const userRouter = express.Router();

// userRouter.get("/order", getOrders);

userRouter.post("/user/register", createUserController);
userRouter.post("/user/login", loginUserController);
userRouter.get("/user/getUsers", authMiddleware, getAllUsersController);
// userRouter.delete("/order/:id", deleteOrder);

export default userRouter;
