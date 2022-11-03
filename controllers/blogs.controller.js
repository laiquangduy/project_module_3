// const bodyParser = require("body-parser");
// const db = require("../models/db")

// module.exports.getAll = (req, res) => {
//     db.execute("SELECT * FROM tbl_blogs")
//         .then((data) => {
//             res.render("blog", {
//                 data: data[0],
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// };

// module.exports.deleteOne = (req, res) => {
//     let id = req.params.id;
//     db.execute("DELETE FROM tbl_blogs WHERE id =?", [id])
//         .then((data) => {
//             res.status(200).json({
//                 Message: "Delete successfully",
//             })
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }

// module.exports.updateOne = (req, res) => {
//     let id = req.params.id;
//     let {title, content, img, user_id } = req.body;
//     db.execute("UPDATE tbl_users SET title = ?, content = ?, img = ?, user_id = ? WHERE id =?", [title, content, img, user_id, id])
//         .then((data) => {
//             res.status(200).json({
//                 Message: "Update successfully",
//             })
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }

const db = require("../models/db");
const bcrypt = require("bcrypt"); // thư viện mã hóa password
const saltRounds = 10;
const _ = require("lodash");

module.exports.getAll = (req, res) => {
  // page size và curent page index
  // query string

  let { page_size, page_index } = req.query;
  // console.log(page_size, page_index);

  // check nếu bọn này không tồn tại thì trả về page size bản ghi đầu tiên
  page_index = Number(page_index) || 1; // (page_index = page_index ? page_index : 1)
  page_size = Number(page_size) || 5;
  let total = 0;
  //nếu tồn tại thì trả về page size và current page
  // db.execute(`SELECT * FROM tbl_users LIMIT ${page_size} OFFSET ${(page_index - 1)*page_size}`)
  db.execute(`SELECT * FROM tbl_blogs`)
    .then((data) => {
      // console.log(data);
      let [rows, cols] = data;
      //array destructuring
      // let rows = data[0]
      // let cols = data[1]
      total = rows.length;
      return db.execute(
        `SELECT * FROM tbl_blogs LIMIT ${page_size} OFFSET ${
          (page_index - 1) * page_size
        }`
      );
    })
    .then((data) => {
      let [rows, cols] = data;
      // console.log(total);
      res.render("blogs", {
        data: rows,
        total,
        page_size,
      });
    })
    .catch((err) => console.log(err));
};

module.exports.getOne = (req, res) => {
  let id = req.params.id;
  db.execute("SELECT * FROM tbl_blogs WHERE id = ?", [id])
    .then((data) => {
      let [rows] = data;
      res.status(200).json({
        data: rows[0],
      });
    })
    .catch((err) => console.log(err));
};

module.exports.createOne = (req, res) => {
  let { title, content } = req.body;
  let { userId } = req.body;
  if (!title || !content) {
    return res.status(500).json({
      message: "Invalid title or content",
    });
  }
  // generate password add id
  password = bcrypt.hashSync(password, saltRounds);
  // console.log(password);
  let id = Math.floor(Math.random() * 1000000);
  // execute SQL query
  db.execute("SELECT * FROM tbl_blogs WHERE email=?", [title])
    .then((data) => {
      let [rows] = data; // 1 mảng chứa 1 phần tử nếu tìm thấy user
      // 1 mảng chứa 1 phẩn tử nếu tìm thấy user
      // [] nếu không tìm thấy
      if (rows.length > 0) {
        return Promise.reject("User already exist");
      } else {
        return db.execute(`INSERT INTO tbl_blogs VALUE(?, ?, ?, ?, ?)`, [
          id,
          title,
          content,
          null,
          userId,
        ]);
      }
    })
    .then((data) => {
      // console.log(data);
      res.status(200).json({
        message: "Create one susscessful",
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

module.exports.updateOne = (req, res) => {
  // let id = req.params.id;
  let { id } = req.params;
  let { title, content, img } = req.body;
  db.execute(
    "UPDATE tbl_blogs SET title = ?, content = ?, img = ? WHERE id =?",
    [title, content, img, id]
  )
    .then((data) => {
      res.status(200).json({
        message: "update one successfully",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.deleteOne = (req, res) => {
  let { id } = req.params;
  db.execute("DELETE FROM tbl_blogs WHERE id =?", [id])
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "delete one successfully",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.getBlogsByUserId = (req, res) => {
  let { id } = req.params;
  db.execute("SELECT *,tbl_users.imgprofile,tbl_users.username FROM tbl_blogs,tbl_users WHERE user_id = ? AND user_id=tbl_users.id", [id])
    .then((data) => {
      let [rows] = data;
      // let renderData = _.chunk(rows, 3);
      console.log(rows);
      res.render("homepage", {
        data: rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "err",
        message: err,
      });
    });
 
  //   console.log(req.params);
  //   res.render("user-blog");
};
module.exports.uploadBlogsByUserId = (req, res) => {
  console.log("Reply from upload");
  res.render("upload");
};
// Pagination

// current page index (Đang ở trang bao nhiêu)
// page size (Có bao nhiêu trang)

module.exports.getBlog = (req, res) => {
  db.execute("SELECT * FROM tbl_blogs")
    .then((data) => {
      let [rows, cols] = data;
      res.render("homepage", {
        data: rows,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // res.render('homepage');
};

module.exports.createPost = (req,res)=>{
  let { img, caption } = req.body;
  let { userId } = req.body;
  if (!img || !caption) {
    return res.status(500).json({
      message: "Invalid img or caption",
    });
  }
  let id = Math.floor(Math.random() * 1000000);
  // execute SQL query
  db.execute(`INSERT INTO tbl_blogs VALUE(?, ?, ?, ?, ?)`,[id,img,caption,0,userId])
    .then((data) => {
      // console.log(data);
      res.status(200).json({
        message: "Create one susscessful",
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
}