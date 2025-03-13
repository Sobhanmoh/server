const schoolRouter = require("./routers/school.router.js");
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieparser());


// mongoodb
mongoose.connect(`mongodb+srv://kingsobhan57:IakHc0pdrXB11ZO6@school.zijq4.mongodb.net/?retryWrites=true&w=majority&appName=school`).then(db=>{
    console.log("mongoodb connected.")
}).catch(e=>{
    console.log("mongodb error", e)
})


// routers
app.use("/api/school", schoolRouter);
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("server is running at PORT =>", PORT)
})








