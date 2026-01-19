const { body, param } = require('express-validator');

/**
 * Validation rules for tasks
 */
const createTaskValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 100 })
        .withMessage('Title cannot be more than 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot be more than 500 characters'),
    body('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed'])
        .withMessage('Status must be pending, in-progress, or completed'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high'),
    body('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Due date must be a valid date'),
];

const updateTaskValidation = [
    param('id').isMongoId().withMessage('Invalid task ID'),
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Title cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Title cannot be more than 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot be more than 500 characters'),
    body('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed'])
        .withMessage('Status must be pending, in-progress, or completed'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high'),
    body('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Due date must be a valid date'),
];

const taskIdValidation = [
    param('id').isMongoId().withMessage('Invalid task ID'),
];

module.exports = {
    createTaskValidation,
    updateTaskValidation,
    taskIdValidation,
};
