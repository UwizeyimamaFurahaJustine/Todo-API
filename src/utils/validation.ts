import Joi from 'joi';

export const signupSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().regex(/^\S+@\S+\.\S{2,}$/).lowercase().required().messages({
        'string.pattern.base': 'Please enter a valid email address in the format name@example.example',
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});


export const loginSchema = Joi.object({
    email: Joi.string().regex(/^\S+@\S+\.\S{2,}$/).lowercase().required().messages({
        'string.pattern.base': 'Please enter a valid email address in the format name@example.example',
    }),
    password: Joi.string().required(),
});