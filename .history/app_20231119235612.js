import express from 'express'
import Lab5 from "./lab5.js";
import Hello from "./hello.js"
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from './modules/routes.js';
const app = express()
app.use(cors());
app.use(express.json());
CourseRoutes(app);
Hello(app)
Lab5(app);
app.listen(4000)