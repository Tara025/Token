import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "../backend/database/connectDB.js";
import userRouter from "../backend/routes/userRouter.js";
import cors from "cors";



const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5050;
const connectionString = process.env.MONGO_URL;


app.use("/api", userRouter);

(async () => {
   try {
      await connectDB(connectionString);
      console.log("Mit MONGODB verbunden!");
      //
      app.listen(port, () => {
         console.log(`Server läuft auf Port: ${port}`);
      });
   } catch (error) {
      console.log(error);
   }
})();
