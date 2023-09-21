const express = require ('express')
const app = express()
const port  = 2000
const web = require('./routes/web')
const connectdb = require('./db/connectdb')
// cookies
const cookieparser = require('cookie-parser')
// for msg show
let session = require('express-session')
let flash = require('connect-flash');
const fileUpload = require("express-fileupload");
// for file upload
app.use(fileUpload({useTempFiles: true}));


app.use(cookieparser())

// For msg show use 
app.use(session({
  secret: 'secret',
  cookie: {maxAge:60000},
  resave: false,
  saveUninitialized: false,

}));

app.use(flash());


//view engine ejs
app.set('view engine','ejs')

//for image and css
app.use(express.static('public'))

//for data get
app.use(express.urlencoded({extended:true}))

//db connection
connectdb()

//route load
app.use('/',web)










// server create 
app.listen(port, () => {
    console.log(`server is runing loaclhost: ${port}`)
  })