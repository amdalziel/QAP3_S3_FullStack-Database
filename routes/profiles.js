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

module.exports = router; 