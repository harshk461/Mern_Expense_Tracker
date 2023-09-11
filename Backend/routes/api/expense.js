const express = require('express');
const router = express.Router()

//model
const Expense = require('../../models/Expense');

//routes

//Adding New Expense
router.post("/add", (req, res) => {
    const data = req.body;
    try {
        const newExpense = new Expense(data);
        newExpense
            .save()
            .then(t => res.json(t))
            .catch(e => console.log(e));
    } catch (e) {
        console.log(e);
    }
});

//get all data
router.get("/get/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const data = await Expense.find({ email: email });
        return res.status(200).json(data);

    }
    catch (e) {
        console.log(e);
    }
})

//Deleting an expense
router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    try {
        Expense.deleteOne({ _id: id })
            .then(data => res.json(data))
            .catch((e) => console.log(e));
    }
    catch (e) {
        console.log(e)
    };
})

module.exports = router;