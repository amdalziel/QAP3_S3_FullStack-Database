var router = require('express').Router();
const profilesDal = require('../../services/DAL/pg.travelbug_dal'); 


// api/profiles
router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/profiles/ GET ' + req.url);
    try {
        let theProfiles = await profilesDal.getProfiles(); 
        res.json(theProfiles);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

module.exports = router;