const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors=require('cors');
const authRoute = require("./routers/auth");
const dotenv = require('dotenv');
const userRoute = require("./routers/users");
const moviesRoute = require("./routers/catdata");
dotenv.config();
app.use(cors());
mongoose.connect('mongodb://localhost:27017/cinema_app', {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true})
.then(()=> console.log("DB Connection succesfully.."))
.catch((err)=> console.log(err))

app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use("/api/movies",moviesRoute)

app.listen(5000, ()=> console.log("Backend server running in port 5000 "))