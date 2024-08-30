const Joi = require('joi');
const MINIMUM_LETTERS = 2
const createTaskSchema = Joi.object({
    title: Joi.string().min(MINIMUM_LETTERS).required().messages({
        'string.empty': 'Title is required',
        'any.required': 'Title is required',
    }),
    description: Joi.string().optional().allow('').messages({
        'string.base': 'Description must be a string',
    }),
});

const updateTaskSchema = Joi.object({
    title: Joi.string().min(MINIMUM_LETTERS).required().messages({
        'string.empty': 'Title is required',
        'any.required': 'Title is required',
    }),
    description: Joi.string().optional().allow('').messages({
        'string.base': 'Description must be a string',
    }),
    completed: Joi.boolean().required().messages({
        'boolean.base': 'Completed must be a boolean value',
        'any.required': 'Completed status is required',
    }),
});

module.exports = {
    createTaskSchema,
    updateTaskSchema,
};
