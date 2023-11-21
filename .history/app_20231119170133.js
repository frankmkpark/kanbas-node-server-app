import express from 'express'
import Lab5 from "./lab5.js";
import Hello from "./hello.js"
const app = express()
Hello(app)
Lab5(app);
app.listen(4000)