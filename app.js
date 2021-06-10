const express = require('express');
const mongoose = require('mongoose');
const AuthRoutes = require("./routes/auth");
const CookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(CookieParser());

// database connection
const dbURI = 'mongodb+srv://shoaib:Desperados1@cluster019.s7jlw.mongodb.net/NodeAuth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(3000);
    console.log("db connected");
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));



//setting cookies
// app.get('/set-cookie', (req,res) =>{
//   //res.setHeader('Set-Cookie','username=shoaib');
//   res.cookie('username', 'sehar anti');
//   res.cookie('age', 77 , {maxAge : 1000*60*60*24, httpOnly: true, secure: true});
//   res.send("cookie set");
// })



//reading cookies
// app.get('/get-cookie', (req,res) => {
//   const cookies = req.cookies;
//   console.log(cookies.username);
//   res.json(cookies.username);
// })

app.get('*', checkUser);
app.get('/smoothies', requireAuth,(req, res) => res.render('smoothies'));
app.use(AuthRoutes);