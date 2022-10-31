const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogs.controller")

router.get("/", blogController.getBlog);

module.exports = router;