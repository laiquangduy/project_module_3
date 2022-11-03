// const { Router } = require("express");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const blogController = require("../controllers/blogs.controller");
const { requireAdmin } = require("../middlewares/auth.middlewares");
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

// /users
router.get("/", requireAdmin, userController.getAll);

// Get one by id
router.get("/:id", userController.getOne);

// Read one by id
router.post("/", userController.createOne);

// Get all blogs by user Id
router.get("/:id/homepage", blogController.getBlogsByUserId);

router.get("/:id/update", (req, res) => {
  res.render("update");
});

// Update one by id
router.put("/:id", userController.updateOne);

// Upload
// router.get("/:id/upload", blogController.uploadBlogsByUserId);

router.post("/:id/homepage", upload.single("image"), (req, res) => {
      console.log(req.file);
      console.log(req.body); // post thì chuyển sang request.body
    });

// Delete one by id
router.delete("/:id", requireAdmin, userController.deleteOne);

//upload
router.post("/:id/homepage", blogController.createPost);

module.exports = router;
