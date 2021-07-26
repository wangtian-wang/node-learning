var express = require("express"),
  router = express.Router();
var Student = require("./data-mon"); // 引入的这个文件默认的导出的是一个 Student 表,所以引入的也是这张表
const { call } = require("body-parser");

const student = {
  find(cb) {
    Student.find((err, ret) => {
      if (err) {
        cb(err);
      }
      cb(null, ret);
    });
  },
  add(req, callback) {
    var student = new Student({
      name: req.body.name,
      sex: req.body.gender,
      hobbies: req.body.hobbies,
    });
    student.save((err, ret) => {
      if (err) {
        callback(err, "新增加数据失败");
      }
      callback(null, ret, "新增加数据成功");
    });
  },
  findById(id, cb) {
    Student.findById(id, (err, ret) => {
      if (err) {
        cb(err);
      }
      cb(null, ret);
      console.log(id, ret, "in find by id");
    });
  },
  findByIdAndUpdate(id, req, callback) {
    var content = {
      name: req.body.name,
      sex: req.body.gender,
      hobbies: req.body.hobbies,
    };
    Student.findByIdAndUpdate(id, content, (err, res) => {
      if (err) {
        callback(err);
      }
      callback(null, res, "in update");
    });
  },
  deleteById(id, callback) {
    Student.findByIdAndRemove(id, (err, ret) => {
      console.log(typeof id, "in remove 111");

      if (err) {
        callback(err);
        console.log(err);
      }
      callback(null, ret);
      console.log(ret, id, "in remove");
    });
  },
};

router.get("/students", (req, res) => {
  student.find((err, file) => {
    if (err) {
      console.log(err);
      res.status(500);
      return;
    } else {
      res.render("index.html", {
        students: file,
      });
    }
  });
});
router.get("/students/new", (req, res) => {
  res.render("new.html");
});
router.post("/students/new", (req, res) => {
  student.add(req, (err, ret) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/students");
    }
  });
});
router.get("/students/edit", (req, res) => {
  let id = req.query.id;
  id = id.replace(/"/g, ""); // 去除 ID 中的冒号
  student.findById(id, (err, ret) => {
    if (err) {
      console.log(err);
    } else {
      res.render("edit.html", {
        students: ret,
      });
    }
  });
});
router.post("/students/edit", (req, res) => {
  let id = req.body.id;
  id = id.replace(/"/g, ""); // 去除 ID 中的冒号
  student.findByIdAndUpdate(id, req, (err, ret) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/students");
    }
  });
});
router.get("/students/delete", (req, res) => {
  let id = req.query.id;
  id = id.replace(/"/g, ""); // 去除 ID 中的冒号
  student.deleteById(id, (err, ret) => {
    console.log(id, "in match");
    if (err) {
      console.log(err);
    } else {
      console.log(ret, "删除数据成功");
      res.redirect("/students");
    }
  });
});
module.exports = router;
