var router = require('express').Router();
const profilesDal = require('../../services/DAL/pg.travelbug_dal'); 

// api/profile/:id
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
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

module.exports = router;