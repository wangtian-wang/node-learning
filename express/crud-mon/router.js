var express = require("express"),
  router = express.Router();
var dataBase = require("./db");

router.get("/", (req, res) => {
  dataBase.origin((error, data) => {
    if (error) {
    } else {
      console.log(typeof data);

      res.render("index.html", {
        students: data.students,
      });
      console.log(data, "in data");
    }
  });
});
router.get("/students", (req, res) => {
  res.render("index.html");
});
router.get("/students/new", (req, res) => {
  res.render("new.html"); // 调试的时候,想要查看 req 的 body 必须返回一个页面,必须有相应, 否则就会报错或者一直是处于 pending 的状态
  console.log(req.body);
});
//  新增加学生的代码
router.post("/students/new", (req, res) => {
  dataBase.save(req.body, (error) => {
    res.statusCode = 500;
  });
  res.redirect("/");
});
// 获取需要编辑的信息
router.get("/students/edit", (req, res) => {
  console.log(req.query.id);
  /** 1: 根据客户端传递过来的数据,获得需要需改的学生的 Id
   *  2: 拿到 Id 之后,找到需要修改的学生
   *  3: 渲染这个学生的信息,到增加信息的页面
   */
  dataBase.findStudentById(parseInt(req.query.id), (err, student) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      // res.send("server error")
    }
    res.render("edit.html", {
      students: student,
    });
  });
});

router.post("/students/edit", (req, res) => {
  dataBase.upDateById(req.body, (error) => {
    if (error) {
      console.log("change fail");
    }
  });
  res.redirect("/");
});
router.get("/students/delete", (req, res) => {
  dataBase.deleteById(parseInt(req.query.id), (err) => {
    if (err) {
      res.statusCode = 500;
    }
    res.redirect("/");
  });
});

module.exports = router;
