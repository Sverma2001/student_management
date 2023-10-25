const passport = require('passport');

//verify token
const tokenVerified = (req, res, next) => {
    return passport.authenticate('jwt', { session: false })(req, res, next);
}

module.exports = tokenVerified;