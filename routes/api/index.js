var router = require('express').Router();

if(DEBUG) {
    console.log('ROUTE: /api');
}

router.get('/', (req, res) => {
    res.send('API Home Page Working');
});

// http://localhost:3000/api/profiles/
const profilesRouter = require('./profiles')
router.use('/profiles', profilesRouter);

// http://localhost:3000/api/profile/:id
const profileRouter = require('./profile')
router.use('/profile', profileRouter);

module.exports = router;