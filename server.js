const express= require('express')
const app = express();
require("dotenv").config();
const connectDB= require("./configs/database");
const Router= require("./routers")
const ejs = require("ejs");
const cookieParser = require('cookie-parser')
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
//templates engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(cookieParser())


Router(app);
connectDB();

app.listen(process.env.PORT||3000, ()=>{
  console.log("server runed");
})