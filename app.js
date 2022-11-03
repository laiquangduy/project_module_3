const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const morgan = require("morgan");
port = 3000;
const {
  requireAuth,
  notRequireAuth,
  requireAdmin,
} = require("./middlewares/auth.middlewares");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
// import route
let userRoutes = require("./routes/users.routes");
let authRoutes = require("./routes/auth.routes");
let blogRoutes = require("./routes/blogs.routes");

// view engine
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

// third party
app.use(bodyParser.urlencoded({ extended: true })); // form-input (method=post)
app.use(bodyParser.json()); // json (fetch api)
app.use(cors()); // fix cross origin error
app.use(morgan("dev")); // log request on server (for debugging)
app.use(express.static("public")); // hosting static file
app.use(cookieParser("secret"));

// setup route
app.get("/", requireAuth, (req, res) => {
  res.redirect("/users");
});

// User route
app.use("/users", requireAuth, userRoutes);

// Auth route
app.use("/auth", notRequireAuth, authRoutes);

// Blogs route
// app.use("/blogs", requireAuth, blogRoutes);

// Upload route
// app.get("/upload", (req, res) => {
//   res.render("upload"); // post thì chuyển sang request.body
// });
// app.post("/upload", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   console.log(req.body); // post thì chuyển sang request.body
// });

// Admin route
// app.use("/admin",adminRoutes);

// listen on port
app.listen(port, () => {
  console.log(`Server run on http://127.0.0.1:${port}`);
});
