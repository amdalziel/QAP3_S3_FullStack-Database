const router = require('express').Router(); 
const profilesDal = require('../services/DAL/pg.travelbug_dal'); 

router.get('/', async (req, res) => {

    try {
        const getProfiles = await profilesDal.getProfiles(); 
        if(DEBUG) console.table(getProfiles); 
        res.render('profiles', {profiles: getProfiles}); 
        
    } catch (error) {
        res.render('503'); 
        
    }
}); 


// CRUD Operation: PATCH (takes user to profilePatch.ejs)
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('profile.Edit : ' + req.params.id);
    res.render('profilePatch.ejs', {username: req.query.username, destination: req.query.destination, hobbies: req.query.hobbies, theId: req.params.id});
  });


  // CRUD Operation: DELETE (takes user to profileDelete.ejs)
  router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('profile.Delete : ' + req.params.id);
    res.render('profileDelete.ejs', {username: req.query.username, theId: req.params.id});
  });


// Display ONE profile (selected by the user in the browser as the id)
router.get('/:id', async (req, res) => {
  if(DEBUG) console.log('ROUTE: /profile/:id ' + req.url);
  try {
      let theProfile = await profilesDal.getProfileByProfileID(req.params.id); 
      if(DEBUG) console.log(theProfile[0]); 
      if(theProfile.length === 0) {
          res.render('norecord');  
      } else {
      res.render('profile.ejs', {
        username: theProfile[0].username,
        destination: theProfile[0].destination,
        hobbies: theProfile[0].hobbies,
        theId: req.params.id
      });
      }
  } catch {
      res.statusCode = 503;
      res.json({message: "Service Unavailable", status: 503});
  }
});


  // CRUD Operation: POST (user adds a profile on the profiles.ejs page)
  router.post('/', async (req, res) => {
    if(DEBUG) console.log("profiles.POST");
    try {
        if(DEBUG) console.log(req.body.destination); 
        await profilesDal.addProfile(req.body.username, req.body.destination, req.body.hobbies);
        res.redirect('/profiles');
    } catch (err){
   
        if (err.status === 400) {
            res.status(400).render('usernameError');
          } else {
            res.status(500).render('errorPage');

    } 
}
  });




  router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('profiles.PATCH: ' + req.params.id);
    try {
        await profilesDal.patchProfile(req.params.id, req.body.username, req.body.destination, req.body.hobbies);
        res.redirect('/profiles');
    } catch (err) {
        if (err.status === 400) {
            res.status(400).render('usernameError', { message: err.message });
          } else {
            // Handle other errors
            res.status(500).render('errorPage', { message: 'An unexpected error occurred.' });

    }
}
  });


  router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('profiles.DELETE: ' + req.params.id);
    try {
        await profilesDal.deleteProfile(req.params.id);
        res.redirect('/profiles');
    } catch {
        // log this error to an error log file.
        res.render('503');
    }
  });

module.exports = router; 