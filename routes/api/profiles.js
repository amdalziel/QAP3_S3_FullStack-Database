var router = require('express').Router();
const profilesDal = require('../../services/DAL/pg.travelbug_dal'); 


// api/profiles
router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/profiles/ GET ' + req.url);
    try {
        let theProfiles = await profilesDal.getProfiles(); 
        res.json(theProfiles);
    } catch {
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});


// api/profiles/:id
router.get('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/profile/:id GET ' + req.url);
    try {
        let theProfile = await profilesDal.getProfileByProfileID(req.params.id); 
        if(theProfile.length === 0) {
            res.render('norecord');  
        } else {
        res.json(theProfile);
        }
    } catch {
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});



module.exports = router;