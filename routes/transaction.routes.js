const expense = require('express');
const router = expense.Router();
const { body } = require('express-validator');
const transactionController = require('../controllers/transaction.controller.js');
const { auth } = require('../middlewares/auth.middleware.js');

// Add a transaction (Income or Expense)
router.post('/addTransaction',
    auth,
    body('type').isIn(['income', 'expense']).withMessage('Transaction type is required'),
    body('amount').isNumeric().withMessage('Amount is required'),
    body('description').isLength({ min: 1 }).withMessage('Description is required'),
    transactionController.addTransaction
);
// Get all transactions
router.get('/getTransactions',
    auth,
    transactionController.getTransactions
);
// Get a transaction by ID
router.get('/getTransaction/:id',
    auth,
    transactionController.getTransactionById
);
//delete a transaction by ID
router.delete('/deleteTransaction/:id',
    auth,
    transactionController.deleteTransaction
);
// Update a transaction by ID
router.put('/updateTransaction/:id',
    auth,
    body('type').isIn(['income', 'expense']).withMessage('Transaction type is required'),
    body('amount').isNumeric().withMessage('Amount is required'),
    body('description').isLength({ min: 1 }).withMessage('Description is required'),
    transactionController.updateTransaction
);
// Get summary of transactions
router.get('/getsummary',
    auth,
    transactionController.getSummary
);
// Get transactions by type (income or expense)
router.get('/getTransactionByType/:type',
    auth,
    transactionController.getTransactionsByType
);


module.exports = router;