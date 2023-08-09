import express from "express";
import { createUserController } from "../controllers/userController.js";
import { loginUserController } from "../controllers/userController.js";
// import  * as user from "../controllers/userController";

const userRouter = express.Router();

// userRouter.get("/order", getOrders);
// userRouter.get("/order/:id", getOrdersForTable);
userRouter.post("/user/register", createUserController);
userRouter.post("/user/login", loginUserController);
// userRouter.delete("/order/:id", deleteOrder);

export default userRouter;
