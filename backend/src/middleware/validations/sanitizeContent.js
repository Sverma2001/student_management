const sanitizeHtml = require('sanitize-html');

const sanitizeContent = (value,helpers) => {
    const sanitizedValue = sanitizeHtml(value, {
        allowedTags : [],
        allowedAttributes : {}
    });

    if(sanitizedValue !== value) {
        return helpers.error('any.invalid');
    }
    return sanitizedValue;
}

module.exports = sanitizeContent;