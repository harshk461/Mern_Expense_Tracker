import React, { useState, useEffect } from 'react';
import Loader from '../Components/Loader'
export default function ExpenseHeader({ data }) {
    const [loading, setLoading] = useState(false);
    const [expense, setExpense] = useState({ monthly: 0, daily: 0, yearly: 0 });

    useEffect(() => {
        console.log('ExpenseHeader component rendered.');

        const calculateExpense = () => {
            setLoading(true);

            const currentDate = new Date(Date.now());
            const currentMonth = currentDate.getMonth();
            const currentDay = currentDate.getDate();
            const currentYear = currentDate.getFullYear();

            const monthly = data.reduce((total, item) => {
                const itemDate = new Date(item.date);
                return itemDate.getMonth() === currentMonth ? total + item.amount : total;
            }, 0);

            const daily = data.reduce((total, item) => {
                const itemDate = new Date(item.date);
                if (
                    itemDate.getMonth() === currentMonth &&
                    itemDate.getDate() === currentDay
                ) {
                    return total + item.amount;
                }
                return total;
            }, 0);

            const yearly = data.reduce((total, item) => {
                const itemDate = new Date(item.date);
                if (itemDate.getFullYear() === currentYear) {
                    return total + item.amount;
                }
                return total;
            }, 0);

            setExpense({ monthly, daily, yearly });
            setLoading(false);
        };

        calculateExpense();

    }, [data]);

    console.log('Expense data:', data);

    return (
        <div className='flex justify-center items-center gap-20 mt-[40px]'>
            <div className='expenseHeaderBox transition duration-300 ease-in-out hover:scale-105 hover:bg-orange-400'>
                <h1 className='text-3xl text-white'>Today's Spending</h1>
                <h1 className='text-6xl'>Rs.{expense.daily}</h1>
            </div>
            <div>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-3xl font-bold'>Monthly Spending: {expense.monthly}</h1>
                    <h1 className='text-3xl font-bold'>Yearly Spending: {expense.yearly}</h1>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    );
}
