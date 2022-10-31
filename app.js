const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const morgan = require("morgan");
port = 3000;

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
// app.use(express.static("public"));


// Khởi tạo blog routes
let blogRouter = require("./routes/blogs.routes")
let userRouter = require('./routes/users.routes');
let authRouter = require('./routes/auth.routes')
// const { use } = require("./routes/blogs.routes");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/upload', (req,res)=>{
  res.render('upload')
})

// Sử dụng blog routes
app.use("/blogs", blogRouter);
app.use("/",authRouter);


// listen on port
app.listen(port, () => {
    console.log(`Server run on http://127.0.0.1:${port}`);
  });