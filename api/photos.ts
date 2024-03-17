import express from "express";
import mysql from "mysql";


export const conn = mysql.createPool({
    connectionLimit: 10,
    host: "sql6.freesqldatabase.com",
    database: "sql6689430",
    user: "sql6689430",
    password: "cSAzghWNsu",
  });
export const router = express.Router();



// get all photos
router.get("/", (req, res) => {
    conn.query('select * from photos', (err, result, fields)=>{
      if(err){
          res.status(400).json(err);
      }else {
          res.json(result);
      }
    });
  });


// get photos By u_id
router.get('/:id', (req, res) => {
    let id = +req.params.id;
    conn.query('select photos.id, photos.filename from photos where u_id = ?', [id], (err, result, fields)=>{
        if(err){
            res.status(400).json(err);
        }else {
            res.json(result);
        }
      });
});

// insert photo with u_id