import "dotenv/config";
import express from "express";
import uploadRoute from "./routes/upload-certificate.js";
import getCertsRoute from "./routes/get-certificate.js";
import authRoutes from "./routes/auth.js";
<<<<<<< HEAD
import mongoose from "mongoose";
=======
>>>>>>> origin/shreeya
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;
import cors from 'cors';
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb+srv://tosylfluoride:rps123@cluster0.k5syn.mongodb.net/cryptocred').then(() => console.log('DB connected'));

mongoose.connect('mongodb+srv://tosylfluoride:rps123@cluster0.k5syn.mongodb.net/cryptocred').then(() => console.log('DB connected'));

// Routes
app.use('/auth', authRoutes);
<<<<<<< HEAD

=======
>>>>>>> origin/shreeya
app.use('/upload-certificate', uploadRoute);
app.use('/get-certificates', getCertsRoute);

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
