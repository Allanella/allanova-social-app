import dotenv from "dotenv"
dotenv.config();
import express from "express"
import { connectToDataBase } from "./database/connectionToDataBase.js";
import authRoutes from './routes/myAuthRoutes.js'




connectToDataBase();

const app = express();

app.get("/", (req, res) =>{
res.send("I love you Lord!!!")
})

//Connection to database

//middle ware 
app.use('/api/auth', authRoutes)

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
console.log("Running file:", process.argv[1]);
//8prgtlKk9LWYNRd3

// mongodb+srv://allanella:8prgtlKk9LWYNRd3@cluster0.12dyl8l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0