const passport = require('passport');
const generateToken = require('../middleware/generateToken');

async function loginUser(req, res) {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = generateToken(user._id);
        res.json({ token });
    })(req, res);
}

module.exports = {
    loginUser
};