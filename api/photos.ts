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
  conn.query(`SELECT id as phoId,  u_id as userId, filename, elo
              FROM photos 
              ORDER BY elo DESC`, (err, result, fields) => {
      if (err) {
          res.status(400).json(err);
      } else {
          // คำนวณ rank ด้วยการนับแถวลำดับ
          let rank = 1;
          result.forEach((row: any, index: number) => {
              row.rank = rank++;
          });

          res.json(result);
      }
  });
});



// get top-10 photos
router.get("/top10", (req, res) => {
  conn.query('SELECT users.id as userId, users.username, users.avatar, photos.id as phoId, photos.filename, photos.elo FROM photos JOIN users on photos.u_id = users.id ORDER BY photos.elo DESC LIMIT 10', (err, result, fields)=>{
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