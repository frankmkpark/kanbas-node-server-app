import "dotenv/config";
import express from 'express'
import Lab5 from "./lab5.js";
import Hello from "./hello.js"
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from './modules/routes.js';
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
import "dotenv/config";
const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
UserRoutes(app);
Hello(app)
Lab5(app);
app.listen(process.env.PORT || 4000);

