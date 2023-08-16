require("dotenv").config();

const express = require("express");
const app = express();
const router = require("./app/router");
const session = require('express-session');
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:true,
    cookie:{
      secure: false,
      maxAge: (1000*60*60) // ça fait une heure
    }
}))

app.set("view engine","ejs");
app.set("views","./app/views");
app.use(express.static("./public"));

//For locals
app.use((req,res,next)=>{
  res.locals.user = req.session.user;
  next();
})

app.use(router);

app.listen(process.env.PORT,()=>console.log(`server runin' on http://localhost:${process.env.PORT}`));