const dal = require('../pg.travelbug_db');

// Get all profiles: 
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

// Get ONE profile (by profile ID): 
var getProfileByProfileID = function(id) {
  if(DEBUG) console.log("logins.pg.dal.getProfileByProfileID()");
  return new Promise(function(resolve, reject) {
    const sql = `SELECT id, username, destination, hobbies \
	FROM public."Profiles" \
	WHERE id=$1; `;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};


// Add a profile: 
// 2. Validate that the username is not already in use by another profile 
// 3. INSERT SQL - add new profile to database 
var addProfile = function(username, destination, hobbies) {
  if (DEBUG) console.log("profiles.pg.dal.addProfile()");

  let formattedDestination = formatDestination(destination); 
  if (DEBUG) console.log(formattedDestination);

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


// PUT (edit) a profile: 
var putProfile = function(id, username, destination, hobbies) {
  if(DEBUG) console.log("profiles.pg.dal.putProfile()");
  if(DEBUG) console.log(id, username, destination, hobbies); 

  let formattedDestination = formatDestination(destination); 
  if (DEBUG) console.log(formattedDestination);

  return new Promise(function(resolve, reject) {
    const checkPatchUsernameSQL = `SELECT COUNT(*) AS count FROM public."Profiles" WHERE NOT(id = $1) AND username = $2;`;
    dal.query(checkPatchUsernameSQL, [id, username], (checkErr, checkResult) => {
      if (checkErr) {
        reject(checkErr);
      } else {

        let addHobbies = formatHobbyArray(hobbies); 

        const usernameExists = checkResult.rows[0].count > 0;
        if(DEBUG) console.log(usernameExists); 
        if (usernameExists) {
          reject({ status: 400, message: "Error: Username already taken." });
        } else {
          const sql = `UPDATE public."Profiles" \
             SET username= $2, destination= $3, hobbies= $4 \
             WHERE id = $1;`;
            dal.query(sql, [id, username, formattedDestination, addHobbies], (err, result) => {
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



// PATCH (edit) a profile - add to the hobbies list: 
var patchProfile = function(id, hobbies) {
  if(DEBUG) console.log("profiles.pg.dal.patchProfile()");
  if(DEBUG) console.log(id, hobbies); 

  let addHobbies = formatHobbyArray(hobbies); 

  return new Promise(function(resolve, reject) {
    const sql = `UPDATE public."Profiles" \
    SET hobbies = hobbies || $2 \ 
    WHERE id = $1;
    `;
    dal.query(sql, [id, addHobbies], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });

  }; 
   
   

// Delete a profile: 
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



//  -----------------------------------------------------

// Function used in above CRUD methods: 

function formatDestination(destination){
  let trimmedDestination = destination.trim().toLowerCase();
  let formattedDestination =
    trimmedDestination.charAt(0).toUpperCase() + trimmedDestination.slice(1);
    return formattedDestination; 
}; 

function formatHobbyArray(hobbies){
  let divideHobbies = hobbies.split(","); 
  console.log(divideHobbies); 
  // let addHobbies = ""; 
  // for(let i = 0; i < divideHobbies.length; i ++) {
  //   addHobbies += divideHobbies[i] + ","; 
  // }
  // addHobbies = addHobbies.slice(0, -1); 

  // if(DEBUG) console.log(addHobbies); 
  return divideHobbies; 
}



module.exports = {
  getProfiles,
  getProfileByProfileID, 
  putProfile, 
  deleteProfile, 
  addProfile, 
  patchProfile, 
}; 