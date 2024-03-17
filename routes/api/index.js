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


module.exports = router;