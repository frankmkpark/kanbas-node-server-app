// Importing required modules
import "dotenv/config";
import express from 'express';
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";
import connectMongo from "connect-mongo"; // For production-ready session store

// Importing route modules
import Lab5 from "./lab5.js";
import Hello from "./hello.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from './modules/routes.js';
import UserRoutes from "./users/routes.js";

// MongoDB connection setup
const MongoStore = connectMongo(session);
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

// Fail fast if DB_CONNECTION_STRING is not set
if (!CONNECTION_STRING) {
  console.error('MongoDB connection string is not set.');
  process.exit(1);
}

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Express application setup
const app = express();

// CORS configuration
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL, // Your frontend application's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware to parse JSON bodies
app.use(express.json());

// Session configuration for production
const sessionOptions = {
  secret: "your-session-secret", // Replace with a real secret
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ 
    mongooseConnection: mongoose.connection,
    collection: 'sessions' // Optional: define sessions collection name
  }),
  cookie: {
    secure: process.env.NODE_ENV === "production", // Cookies are only over HTTPS
    httpOnly: true // Prevents client side JS from reading the cookie 
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
