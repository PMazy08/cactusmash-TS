import express from "express";
import mysql from "mysql";
import { queryAsync } from "../dbconnect";

export const conn = mysql.createPool({
    connectionLimit: 10,
    host: "sql6.freesqldatabase.com",
    database: "sql6689430",
    user: "sql6689430",
    password: "cSAzghWNsu",
  });
export const router = express.Router();

// get all users
router.get("/", (req, res) => {
  conn.query('select * from users', (err, result, fields)=>{
    if(err){
        res.status(400).json(err);
    }else {
        res.json(result);
    }
  });
});



// register
router.post("/register", (req, res) => {
  let avatar = "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg";
  let role = "user";
  const { username, email, password} = req.body;
  let sql = "INSERT INTO `users`(`username`, `email`, `password`, `role`, `avatar`) VALUES (?,?,?,?,?)";
  sql = mysql.format(sql, [
    username,
    email,
    password,
    role,
    avatar
  ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });

});


// login post
router.post("/login", (req, res) => {
  const { email, password } = req.body; // รับค่า username และ password จาก req.body
  // ตรวจสอบว่ามี username และ password ที่ระบุหรือไม่
  if (!email || !password) {
    return res.status(400).json({ error: "กรุณาระบุชื่อผู้ใช้และรหัสผ่าน" });
  }

  let sql = "SELECT users.id, users.username, users.role, users.avatar FROM users WHERE email = ? AND password = ?";
  sql = mysql.format(sql, [email, password]);

  conn.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "ข้อผิดพลาดภายในเซิร์ฟเวอร์"+err });
    }

    if (result.length > 0) {
      // ข้อมูลเข้าสู่ระบบถูกต้อง
      res.json(result);
      // res.json({ message: "เข้าสู่ระบบสำเร็จ" });
    } else {
      // ข้อมูลเข้าสู่ระบบไม่ถูกต้อง
      res.json(null);
      // res.status(401).json({ error: "emailหรือรหัสผ่านไม่ถูกต้อง" });
    }
  });
});



// // login get
// router.get("/loginget/:email/:password", (req, res) => {
//   const { email, password } = req.query; // รับค่า username และ password จาก req.query
//   // ตรวจสอบว่ามี username และ password ที่ระบุหรือไม่
  
//   if (!email || !password) {
//     return res.status(400).json({ error: "กรุณาระบุชื่อผู้ใช้และรหัสผ่าน" });
//   }

//   let sql = "SELECT users.id, users.username, users.role, users.avatar FROM users WHERE email = ? AND password = ?";
//   sql = mysql.format(sql, [email, password]);

//   conn.query(sql, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: "ข้อผิดพลาดภายในเซิร์ฟเวอร์"+err });
//     }

//     if (result.length > 0) {
//       // ข้อมูลเข้าสู่ระบบถูกต้อง
//       res.json(result);
//       // res.json({ message: "เข้าสู่ระบบสำเร็จ" });
//     } else {
//       // ข้อมูลเข้าสู่ระบบไม่ถูกต้อง
//       res.status(401).json({ error: "emailหรือรหัสผ่านไม่ถูกต้อง" });
//     }
//   });
// });



  