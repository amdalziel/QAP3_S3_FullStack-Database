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


router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('profile.Edit : ' + req.params.id);
    res.render('profilePatch.ejs', {username: req.query.username, destination: req.query.destination, hobbies: req.query.hobbies, theId: req.params.id});
  });




  router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('profiles.PATCH: ' + req.params.id);
    try {
        await profilesDal.patchProfile(req.params.id, req.body.username, req.body.destination, req.body.hobbies);
        res.redirect('/profiles');
    } catch {
        // log this error to an error log file.
        res.render('503');
    }
  });

module.exports = router; 