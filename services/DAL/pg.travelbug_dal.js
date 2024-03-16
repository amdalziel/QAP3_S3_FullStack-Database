const dal = require('../pg.travelbug_db');

//get all logins.
var getProfiles = function() {
  if(DEBUG) console.log("profiles.pg.dal.getProfiles()");
  return new Promise(function(resolve, reject) {
    const sql = `SELECT * FROM public."Profiles" \
    ORDER BY id DESC ;`
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


var addProfile = function(username, destination, hobbies) {
  if (DEBUG) console.log("profiles.pg.dal.addProfile()");

  let trimmedDestination = destination.trim().toLowerCase();
  let formattedDestination =
    trimmedDestination.charAt(0).toUpperCase() + trimmedDestination.slice(1);
  if (DEBUG) console.log(formattedDestination);

  // Check if username already exists
  return new Promise(function(resolve, reject) {
    const checkUsernameSQL = `SELECT COUNT(*) AS count FROM public."Profiles" WHERE username = $1;`;
    dal.query(checkUsernameSQL, [username], (checkErr, checkResult) => {
      if (checkErr) {
        reject(checkErr);
      } else {
        const usernameExists = checkResult.rows[0].count > 0;
        if(DEBUG) console.log(usernameExists); 
        if (usernameExists) {
          reject({ status: 400, message: "Error: Username already taken." });
        } else {
          
          const insertProfileSQL = `INSERT INTO public."Profiles" (username, destination, hobbies) VALUES ($1, $2, Array[$3]);`;
          dal.query(insertProfileSQL, [username, formattedDestination, hobbies], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.rows);
            }
          });
        }
      }
    });
  });
};


var patchProfile = function(id, username, destination, hobbies) {
  if(DEBUG) console.log("profiles.pg.dal.patchProfile()");
  if(DEBUG) console.log(id, username, destination, hobbies); 

  let trimmedDestination = destination.trim().toLowerCase();
  let formattedDestination =
    trimmedDestination.charAt(0).toUpperCase() + trimmedDestination.slice(1);
  if (DEBUG) console.log(formattedDestination);

  // Check if username already exists
  return new Promise(function(resolve, reject) {
    const checkPatchUsernameSQL = `SELECT COUNT(*) AS count FROM public."Profiles" WHERE NOT(id = $1) AND username = $2;`;
    dal.query(checkPatchUsernameSQL, [id, username], (checkErr, checkResult) => {
      if (checkErr) {
        reject(checkErr);
      } else {
        const usernameExists = checkResult.rows[0].count > 0;
        if(DEBUG) console.log(usernameExists); 
        if (usernameExists) {
          reject({ status: 400, message: "Error: Username already taken." });
        } else {
          const sql = `UPDATE public."Profiles" \
             SET username= $2, destination= $3, hobbies= Array[$4] \
             WHERE id = $1;`;
            dal.query(sql, [id, username, formattedDestination, hobbies], (err, result) => {
              console.log(`In query` + username); 
              if (err) {
       
                  reject(err);
                } else {
      
                  resolve(result.rows);
                }
            }); 
          };
        }
      }) 
    })
  }; 
   


var deleteProfile = function(id) {
  if(DEBUG) console.log("profiles.pg.dal.deleteProfile()");
  return new Promise(function(resolve, reject) {
    const sql = `DELETE FROM public."Profiles" WHERE id = $1;`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};



module.exports = {
  getProfiles,
  getProfileByProfileID, 
  patchProfile, 
  deleteProfile, 
  addProfile, 
}; 