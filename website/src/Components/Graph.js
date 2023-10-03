import React from 'react'

export default function Graph(props) {
    const expenses = props.data;
    const expenseMap = {};

    for (const expense of expenses) {
        const amount = expense.amount;
        const dateObject = new Date(expense.date);

        const month = dateObject.getMonth() + 1; // Adding 1 because getMonth() returns 0-based months (0 = January)
        const year = dateObject.getFullYear();
        const category = expense.category;

        if (!expenseMap[year]) {
            expenseMap[year] = {};
        }

        if (!expenseMap[year][month]) {
            expenseMap[year][month] = {};
        }

        if (!expenseMap[year][month][category]) {
            expenseMap[year][month][category] = 0;
        }

        expenseMap[year][month][category] += amount;
    }
    console.log(expenseMap);
    return (
        <div>
            <h1>hsh</h1>
        </div>
    )
}
