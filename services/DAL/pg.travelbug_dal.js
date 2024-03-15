const dal = require('../pg.travelbug_db');

//get all logins.
var getProfiles = function() {
  if(DEBUG) console.log("profiles.pg.dal.getProfiles()");
  return new Promise(function(resolve, reject) {
    const sql = `SELECT * FROM public."Profiles" \
    ORDER BY id ASC ;`
    dal.query(sql, [], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

var getProfileByProfileID = function(id) {
  if(DEBUG) console.log("logins.pg.dal.getProfileByProfileID()");
  return new Promise(function(resolve, reject) {
    const sql = `SELECT id, username, destination, hobbies \
	FROM public."Profiles" \
	WHERE id=$1; `;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

// var addLogin = function(username, password, email, uuid) {
//   if(DEBUG) console.log("logins.pg.dal.addLogin()");
//   return new Promise(function(resolve, reject) {
//     const sql = `INSERT INTO public."Logins"(username, password, email, uuid) \
//         VALUES ($1, $2);`;
//     dal.query(sql, [username, password], (err, result) => {
//       if (err) {
//           if(DEBUG) console.log(err);
//           reject(err);
//         } else {
//           resolve(result.rows);
//         }
//     }); 
//   });
// };


var patchProfile = function(id, username, destination, hobbies) {
  if(DEBUG) console.log("profiles.pg.dal.patchProfile()");
  return new Promise(function(resolve, reject) {
    const sql = `UPDATE public."Profiles" \
    SET username= $2, destination= $3, hobbies= Array[$4] \
    WHERE id = $1;`;
    dal.query(sql, [id, username, destination, hobbies], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};


// var deleteLogin = function(id) {
//   if(DEBUG) console.log("logins.pg.dal.deleteLogin()");
//   return new Promise(function(resolve, reject) {
//     const sql = `DELETE FROM public."Logins" WHERE id = $1;`;
//     dal.query(sql, [id], (err, result) => {
//       if (err) {
//           reject(err);
//         } else {
//           resolve(result.rows);
//         }
//     }); 
//   });
// };



module.exports = {
  getProfiles,
  getProfileByProfileID, 
  patchProfile, 
}