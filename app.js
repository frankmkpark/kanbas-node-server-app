// Importing required modules
import "dotenv/config";
import express from 'express';
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";
import connectMongo from "connect-mongo";

// Importing route modules
import Lab5 from "./lab5.js";
import Hello from "./hello.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from './modules/routes.js';
import UserRoutes from "./users/routes.js";

// MongoDB connection setup
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
if (!CONNECTION_STRING) {
  console.error('MongoDB connection string is not set.');
  process.exit(1);
}
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect-mongo session store setup
const MongoStore = connectMongo.create({ mongoUrl: CONNECTION_STRING });

// Express application setup
const app = express();

// CORS configuration
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware to parse JSON bodies
app.use(express.json());

// Session configuration for production
const sessionOptions = {
  secret: "your-session-secret",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true 
  }
};

// Enable sessions in Express
app.use(session(sessionOptions));

// Routes setup
Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);

// Starting the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
