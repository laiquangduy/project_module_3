const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const morgan = require("morgan");
port = 3000;



// listen on port
app.listen(port, () => {
    console.log(`Server run on http://127.0.0.1:${port}`);
  });