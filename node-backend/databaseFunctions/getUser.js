const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("forumDB.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("connected to ForumDB");
});
exports.getUserData = function (username, password) {
  /* db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      return row;
    }
  ); */
  
  db.all(`SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password], function (err, rows) {
    if (err) return cb(err);
    
    rows.forEach(function (row) {
      
      db.close();
      return cb(null, lists);
    });
  });
};
 exports.select = function (cb) {
   var data;
   db.all("SELECT * FROM users WHERE ", function (err, rows) {
     if (err) return cb(err);
     let contador = 0;
     rows.forEach(function (row) {
       lista[contador] =
         row.nombre + ";" + row.cedula + ";" + row.edad + ";" + row.pais;
     });
     db.close();
     return cb(null, lists);
   });
 };