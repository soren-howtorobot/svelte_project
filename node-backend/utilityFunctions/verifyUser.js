const mysql = require("mysql2");
const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "svelte",
});
con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

const isindb = (username, password, callBack) => {
  let un = mysql.escape(username).trim();
  let pw = mysql.escape(password).trim();
  let sql = `SELECT * FROM users WHERE user_name = ${un} AND user_password = ${pw}`;
  console.log(un,pw);
  con.query(
    sql,
    
    function (err, result) {
      if (err) throw err;
      console.log(result);
      return callBack(result);
    }
  );
  
  return callBack;
};

exports.valid = isindb;
