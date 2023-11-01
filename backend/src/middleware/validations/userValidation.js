const Joi = require('joi');
const sanitizeContent = require('./sanitizeContent')

function signupValidation(req, res, next) {
    const signupSchema = Joi.object().keys({
        name: Joi.string()
            .regex(/^[A-Za-z\s]+$/)
            .required()
            .messages({
                "string.pattern.base": "Name should not contain numbers or special characters",
            }),
        username: Joi.string()
            .regex(/^[a-zA-Z0-9\s'\-]{3,}$/)
            .required()
            .messages({
                "string.pattern.base": "Username should not contain special characters",
            }),
        password: Joi.string().custom(sanitizeContent),
    });

    const validationResult = signupSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(422).send(validationResult.error.details[0].message);
    }
    next();
}

function loginValidation(req, res, next) {
    const loginSchema = Joi.object().keys({
        username: Joi.string()
            .regex(/^[a-zA-Z0-9\s'\-]{3,}$/)
            .required()
            .messages({
                "string.pattern.base": "Username should not contain special characters",
            }),
        password: Joi.string()
            .custom(sanitizeContent),
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
        const errorMessage = error.details[0].message;
        return res.status(422).send(errorMessage);
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}