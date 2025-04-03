const Transaction = require("../models/transaction.model.js");
const { validationResult } = require("express-validator");

// Add a transaction (Income or Expense)
module.exports.addTransaction = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { type, amount, description } = req.body;
        // if (!["income", "expense"].includes(type)) {
        //     return res.status(400).json({
        //         success: false,
        //         error: "Invalid transaction type"
        //     });
        // }

        // console.log(req.user);


        const transaction = new Transaction({
            userId: req.user._id,
            type,
            amount,
            description
        });

        await transaction.save();

        return res.status(200).json({
            success: true,
            message: "Transaction added successfully",
            transaction
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get all transactions
module.exports.getTransactions = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        const transactions = await Transaction.find({ userId: req.user._id }).sort({ date: -1 });
        if (!transactions) {
            return res.status(404).json({
                success: false,
                message: "No transactions found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Transactions retrieved successfully",
            transactions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get a single transaction by ID
module.exports.getTransactionById = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const transaction = await Transaction.findById(req.params.id);

        if (!transaction || transaction.userId.toString() !== req.user._id) {
            return res.status(404).json({
                success: false,
                error: "Transaction not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Transaction retrieved successfully",
            transaction
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update a transaction
module.exports.updateTransaction = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const transaction = await Transaction.findById(req.params.id);
        if (!transaction || transaction.userId.toString() !== req.user._id) {
            return res.status(404).json({
                success: false,
                error: "Transaction not found"
            });
        }

        transaction.type = req.body.type || transaction.type;
        transaction.amount = req.body.amount || transaction.amount;
        transaction.description = req.body.description || transaction.description;

        await transaction.save();

        return res.status(200).json({
            success: true,
            message: "Transaction updated successfully",
            transaction
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Delete a transaction
module.exports.deleteTransaction = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const transaction = await Transaction.findById(req.params.id);
        if (!transaction || transaction.userId.toString() !== req.user._id) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        await transaction.findByIdAndDelete(req.params.id);
        await transaction.save();

        return res.status(200).json({
            success: true,
            message: "Transaction deleted successfully",
            // transaction
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get Summary (Total Income, Expenses, and Balance)
module.exports.getSummary = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const transactions = await Transaction.find({ userId: req.user._id });

        const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);

        const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);

        const balance = totalIncome - totalExpenses;

        return res.status(200).json({
            success: true,
            message: "Summary retrieved successfully",
            totalIncome,
            totalExpenses,
            balance
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get transactions by type (Income or Expense)
module.exports.getTransactionsByType = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const transactions = await Transaction.find({ userId: req.user._id, type: req.params.type }).sort({ date: -1 });

        if (!transactions) {
            return res.status(404).json({
                success: false,
                message: "No transactions found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Transactions retrieved successfully",
            transactions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};