import express from "express";
import path from "path";
import mysql from "mysql";
import multer from "multer";



export const conn = mysql.createPool({
    connectionLimit: 10,
    host: "sql6.freesqldatabase.com",
    database: "sql6689430",
    user: "sql6689430",
    password: "cSAzghWNsu",
  });
export const router = express.Router();

class FileMiddleware {
    filename = "";
    public readonly diskLoader = multer({
      storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
          cb(null, path.join(__dirname, "../profiles"));
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 10000);
          this.filename = uniqueSuffix + "." + file.originalname.split(".").pop();
          cb(null, this.filename);
        },
      }),
      limits: {
        fileSize: 67108864, // 64 MByte
      },
    });
  }
  
  const fileUpload = new FileMiddleware()
  router.post("/:u_id", fileUpload.diskLoader.single("file"), (req, res) => {
    let id = +req.params.u_id;
    res.json({ filename: id+"xxxxxxx/profiles/" + fileUpload.filename });
    // const fileUrl = "/profiles/" + fileUpload.filename;
    // let sql = "INSERT INTO `users`(`username`, `email`, `password`, `role`, `avatar`) VALUES (?,?,?,?,?)";
    // sql = mysql.format(sql, [
    //   ]);
    //     conn.query(sql, (err, result) => {
    //       if (err) throw err;
    //       res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
    //     });

  });