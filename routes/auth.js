const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { checkRefreshCookie } = require('./../middlewares/auth-handler');

const { config } = require('./../config/config');

const router = express.Router();

router.post('/login', 
	passport.authenticate('local', {session: false}),
    async (req, res, next) => {
   	// #swagger.tags = ['Auth']
    // #swagger.summary = Login
    try {
        const user = req.user;

        const payload = {
            sub: user._id,
            role: user.role
        }

        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });

        const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: '50m' });

        res.cookie('jwt', refreshToken, {
            httpOnly: true, 
            sameSite: 'None', 
            // secure: true, 
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.json({
            user, 
            token
        });
    }
    catch (error) {
        next(error);
    }
});

router.post('/refresh', 
    checkRefreshCookie,
    async (req, res, next) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = Refresh token
        const refreshToken = req.cookies.jwt;

        try {
            const payload = jwt.verify(refreshToken, config.jwtRefreshSecret);

            const token = jwt.sign({ sub: payload.sub, role: payload.role}, config.jwtSecret, { expiresIn: '15m' });

            res
              .header('Authorization', token)
              .json(token);
        }
        catch(error) {
            next(error);
        }
});


module.exports = router; 