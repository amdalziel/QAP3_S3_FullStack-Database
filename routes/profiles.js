const router = require('express').Router(); 
const profilesDal = require('../services/DAL/pg.travelbug_dal'); 

router.get('/', async (req, res) => {

    try {
        let theProfiles = await profilesDal.getProfiles(); 
        if(DEBUG) console.table(theProfiles); 
        res.render('profiles', {theProfiles}); 
        
    } catch (error) {
        res.render('503'); 
        
    }
}); 

module.exports = router; 