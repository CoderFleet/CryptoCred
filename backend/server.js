import "dotenv/config";
import express from "express";
import uploadRoute from "./routes/upload-certificate.js";
import getCertsRoute from "./routes/get-certificate.js";
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/upload-certificate', uploadRoute);
app.use('/get-certificates', getCertsRoute);

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
