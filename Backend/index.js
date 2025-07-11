import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const User = mongoose.model('User', {
    name: String,
    email: String,
    number: Number
});


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config({
    path: ".env"
})

const port = process.env.PORT || 5000;


const connectDb = async () => {
    try {
        const db = await mongoose.connect(`${process.env.MONGO_URL}/task`);
        console.log("Database connected");
    } catch (error) {
        throw error
    }
}


app.post("/data", async (req, res) => {
    const { name, email, number } = req.body;

    try {
        await User.create({ name, email, number });
        const data = await User.find();
        res.status(200).json({
            success:true,
            message:"Data saved successfully",
            data
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Data not saved",
            error:error.message
        })
    }
})



connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    })
    .catch((error) => {
        console.log("Server error", error);
        process.exit(1);
    })




