import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Table from './Table';

export default function ExpenseTable(props) {
    const data = props.data;
    const months = ['All',
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    const category = ['All', 'Food', 'Transportation', 'Utilities', 'Entertainment'];

    const sort = ['High to Low', 'Low to High', "Newest to Oldest", 'Oldest to Newest'];

    const [filter, setFilter] = useState({
        "input": "",
        "month": "",
        "year": "",
        "category": "",
        "sort": "3",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name]: value,
        })
    }

    const [filterWindow, setWindow] = useState(false);
    const openWindow = () => {
        setWindow(!filterWindow);
    }


    return (
        <>
            <div className='w-2/3 flex flex-col mt-[50px] mx-auto'>
                <div className='w-full flex items-baseline justify-center gap-10'>
                    <input
                        type="text"
                        name='input'
                        className='inputBox'
                        placeholder='Search Expense'
                        value={filter.input}
                        onChange={handleChange}
                    />
                    <button
                        onClick={openWindow}
                        className='bg-transparent transition duration-300  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-md'>
                        Filter
                    </button>
                </div>

                <Table data={data} filter={filter} />

                {/* Filter Window */}
                <div className={`${filterWindow ? "fixed" : "hidden"} top-0 right-0 h-full sm:w-full xl:w-[300px] bg-gray-300 shadow-xl shadow-black ease-in-out transition-all duration-500 ${filterWindow ? 'filterAnimationOpen' : ''}`}>
                    <div className="p-2 flex flex-col justify-center items-center">
                        <div className='flex justify-between items-center w-full px-4'>
                            <h1 className='text-2xl my-4 font-bold '>Filter Window</h1>
                            <AiOutlineClose size={25} onClick={openWindow} />
                        </div>
                        <div className='flex flex-col justify-start w-full p-2 gap-2'>
                            <label htmlFor="month">Sort By</label>
                            <select
                                name="sort"
                                id="sort"
                                className='selectBox w-full'
                                value={filter.sort}
                                onChange={handleChange}>
                                {sort.map((s, index) => (
                                    <option key={index} value={index + 1}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col justify-start w-full p-2 gap-2'>
                            <label htmlFor="month">Choose Month</label>
                            <select
                                name="month"
                                id="month"
                                className='selectBox w-full'
                                value={filter.month}
                                onChange={handleChange}>
                                {months.map((month, index) => (
                                    <option key={index} value={index}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col justify-start w-full p-2 gap-2'>
                            <label htmlFor="year">Choose Year</label>
                            <select
                                name="year"
                                id="year"
                                className='selectBox w-full'
                                value={filter.year}
                                onChange={handleChange}>
                                <option value="all">All</option>
                                {years.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col justify-start w-full p-2 gap-2'>
                            <label htmlFor="year">Choose Category</label>
                            <select
                                name="category"
                                id="category"
                                className='selectBox w-full'
                                value={filter.category}
                                onChange={handleChange}>
                                {category.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
