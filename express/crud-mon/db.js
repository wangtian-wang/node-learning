var fs = require("fs");
var path = "./dataBase/db.json";

exports.origin = function (callback) {
  fs.readFile(path, "utf8", (error, data) => {
    if (error) {
      return callback(error); // 出现错误的时候,要终止错误代码的执行
    }
    callback(null, JSON.parse(data));
  });
};
exports.save = function (obj, callback) {
  fs.readFile(path, "utf8", (error, data) => {
    if (error) {
      return callback(error);
    }
    var students = JSON.parse(data);
    students = students.students;
    obj.id = students[students.length - 1].id + 1; // 处理 id 不重复,唯一性
    students.push(obj);
    console.log(students, obj, "in students");
    console.log(
      JSON.stringify({
        students: students,
      })
    );
    fs.writeFile(
      path,
      JSON.stringify({
        students: students,
      }),
      (error) => {
        if (error) {
          return callback(error);
        }
        callback(null);
      }
    );
  });
};
exports.upDateById = function (obj, callback) {
  fs.readFile(path, "utf8", (error, data) => {
    if (error) {
      return callback(error);
    }
    var students = JSON.parse(data).students;
    var item = students.find((elem) => {
      return elem.id === parseFloat(obj.id);
    });

    console.log(obj, item, "in obj");

    for (let k in obj) {
      // 循环新得到的学生对象,将值赋值给 需要改变的学生对象object.assign(item, obj)
      item[k] = obj[k];
    }

    fs.writeFile(
      path,
      JSON.stringify({
        students: students,
      }),
      (error) => {
        if (error) {
          return callback(error);
        }
        callback(null);
      }
    );
  });
};
exports.findStudentById = function (id, callback) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      return callback("读取文件失败");
    }
    var students = JSON.parse(data).students;
    let item = students.find((elem) => {
      return elem.id === id;
    });
    callback(null, item);
  });
};
exports.deleteById = function (id, callback) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    let item = students.find((elem) => {
      return elem.id === id;
    });
    let pos = students.indexOf(item);
    students.splice(pos, 1);
    fs.writeFile(
      path,
      JSON.stringify({
        students: students,
      }),
      (error) => {
        if (error) {
          return callback(error);
        }
        callback(null);
      }
    );
  });
};
