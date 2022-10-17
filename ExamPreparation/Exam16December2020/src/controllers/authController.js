const router = require('express').Router();
const { body, validationResult } = require('express-validator');


router.get('/register', (req, res) => {
    res.render('register');
});

router.post(
    '/register',
    body('username').isLength({ min: 3 }),
    body('rePass').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Passwords don\'t match!');
        }
        return true;
    }),
    async (req, res) => {
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw new Error('Validation error!');
            }

            await req.auth.register(req.body.username, req.body.password);

            res.redirect('/auth/register');
        } catch (error) {
            const ctx = {
                errors,
                userData: {
                    username: req.body.username
                }
            }
            res.render('register', ctx);
        }
    }
);


router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    res.render('login');
});


module.exports = router;