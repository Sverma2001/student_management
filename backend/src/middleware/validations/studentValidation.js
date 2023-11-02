const Joi = require('joi');
const sanitizeContent = require('./sanitizeContent')

function addStudentValidation(req, res, next) {
    const schema = Joi.object().keys({
        name: Joi.string()
            .regex(/^[A-Za-z\s]+$/)
            .required()
            .messages({
                "string.pattern.base": "Name should not contain numbers or special characters",
            }),
        parent: Joi.string()
            .regex(/^[A-Za-z\s]+$/)
            .required()
            .messages({
                "string.pattern.base": "Parent name should not contain numbers or special characters",
            }),
        class: Joi.string().regex(/^[A-Za-z\s0-9]+$/)
            .required()
            .messages({
                "string.pattern.base":
                    "Class name should not contain special character",
            }),
        address: Joi.string()
            .trim()
            .min(3)
            .allow('', null)
            .custom(sanitizeContent),
        contact: Joi.string()
            .allow('', null)
            .custom(sanitizeContent)
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(422).send({ error: error.details[0].message });
    }
    next();
}

function deleteStudentValidation(req, res, next) {
    const schema = Joi.object().keys({
        uuid: Joi.string().required(),
    });

    const { error } = schema.validate(req.params);
    if (error) {
        return res.status(422).send({ error: error.details[0].message });
    }
    next();
}

const updateStudentValidation = (req, res, next) => {
    const paramSchema = Joi.object().keys({
        uuid: Joi.string().required(),
    });

    const { error: paramError } = paramSchema.validate(req.params);
    if (paramError) {
        return res.status(422).send({ error: paramError.details[0].message });
    }

    const schema = Joi.object().keys({
        address: Joi.string()
            .trim()
            .min(3)
            .required()
            .custom(sanitizeContent),
        contact: Joi.string()
            .required()
            .custom(sanitizeContent)
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(422).send({ error: error.details[0].message });
    }
    next();
}

module.exports = {
    addStudentValidation,
    deleteStudentValidation,
    updateStudentValidation,
};