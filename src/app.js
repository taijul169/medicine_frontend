const { static } = require("express");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const dotenv =  require('dotenv')
const bodyParser =  require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const fileUpload = require("express-fileupload");
const flash = require('connect-flash');
const fs  = require("fs");
dotenv.config({path:'./config.env'});

const helpers = require("../src/middleware/register_helpers")

const app = express();
var http =  require("http").createServer(app)
var io = require("socket.io")(http)
global.io = io;
const controlRoute = require("./routes/control");
const PORT = process.env.MYSQL_PORT;

// const Docregistration = require("./models/register");
// const Doctorappointment = require("./models/appointment");
const { handlebars } = require("hbs");

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// midleware
app.use(bodyParser.urlencoded({extended: true}));           
app.use(bodyParser.json())
app.use(fileUpload());

// // supporting json data
// app.use(express.json());
// getting cookie from browser
app.use(cookieParser())
app.use(session({
    secret:'secret',
    cookie:{maxAge:2000},
    resave:false,
    saveUninitialized:false
}));
app.use((req,res,next)=>{
    res.locals.message =  req.session.message
    delete req.session.messages;
    next()
})
app.use(flash());
// Middleware----

app.use('/', controlRoute);
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);


// app.use(function(req, res, next) {
//     res.local.message = req.flash('message');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
//   })
// home-routing-----------------


// create-item-routing-----------------

// home-routing-----------------
// app.get("/create-item",(req, res)=>{
//     res.render("create-item");
// });

http.listen(PORT,'0.0.0.0', ()=>{

    console.log(`Server is listening from:${PORT}`);
    io.on("connection",function(socket){
        // console.log("User:" + socket.id)
        socket.on("orderSent",function(message){
            console.log(message)
            socket.broadcast.emit("orderSent",message)
            
        })
        // order status display on customer end
        socket.on("UpdatedStatus",function(message){
            console.log("UpdatedStatus",message)
            socket.broadcast.emit("UpdatedStatus",message)
            
        })

        socket.on("oneToOneMessage",function(message){
            socket.broadcast.emit("oneToOneMessage",message)
            console.log(message)
        })
       
        // socket.on("appointmentSent",function(message){
        //     socket.broadcast.emit("appointmentSent",message)
        //     console.log(message)
        // })
        // socket.on("appointmentAccept",function(message){
        //     socket.broadcast.emit("appointmentAccept",message)
        //     console.log(message)
        // })
        
    })
});


