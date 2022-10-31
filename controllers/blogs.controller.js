const db = require('../models/db')

module.exports.getBlog = (req,res) =>{
    db.execute("SELECT * FROM tbl_blogs")
    .then((data)=>{
        let [rows, cols] = data;
        res.render('homepage',{
            data:rows,
        })
    })
    .catch((err)=>{
        console.log(err);
    })
        // res.render('homepage');

}