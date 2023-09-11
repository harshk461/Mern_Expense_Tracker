import axios from 'axios';
import React, { useState } from 'react'
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function AddExpense() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('none');
    const email = JSON.parse(localStorage.getItem("user"))?.email;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        "title": "",
        "description": "",
        "category": selectedCategory,
        "amount": 0,
        "email": email,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "category") {
            setSelectedCategory(e.target.value);
        }

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = (data) => {
        if (data.amount <= 0 || data.category === 'none' || data.title.trim() === '' || data.description.trim() === '') {
            return false;
        }
        else {
            return true;
        }

    }

    const handleSubmit = async () => {
        try {
            if (!validate(data)) {
                alert("Enter Valid Data");
                return;
            }
            else {
                setLoading(true);
                await axios.post(process.env.REACT_APP_BASE_URL + "/expense/add", data)
                    .then(res => res.data)
                    .then(data => {
                        console.log(data);
                        toast.success("New Expense Added Successfully...");
                        navigate("/");
                        return;
                    })
                    .catch(e => {
                        toast.error("Error Occured");
                        navigate('/add');
                        return;
                    });
                setLoading(false);
            }
        } catch (e) {
            toast.error("Error Occured");
            console.log(e);
        };
    }

    return (
        <div
            className='w-full h-screen flex justify-center items-center flex-col'>
            <div
                className='flex justify-between items-center absolute top-12 w-2/3 text-3xl font-bold'>
                <a href="/" className='text-blue-400'>Home</a>
                <h1>Add New Expense</h1>
            </div>
            <div
                className='w-1/3 shadow-md shadow-slate-800 border-4 border-blue-950 rounded-md p-4 flex justify-center items-center flex-col'>
                <h1 className='text-2xl font-bold mb-6'>Add New Expense</h1>
                <input
                    type="text"
                    placeholder='Title'
                    name='title'
                    className='inputBox'
                    value={data.title}
                    onChange={handleChange} />
                <input
                    type="text"
                    placeholder='Description'
                    name='description'
                    className='inputBox'
                    value={data.description}
                    onChange={handleChange} />
                <select
                    id="expenseCategory"
                    className='inputBox bg-white'
                    value={data.category}
                    name='category'
                    onChange={handleChange}>
                    <option value="none">Choose Category</option>
                    <option value="food">Food</option>
                    <option value="transportation">Transportation</option>
                    <option value="utilities">Utilities</option>
                    <option value="entertainment">Entertainment</option>
                </select>

                <input
                    type="number"
                    placeholder='Amount'
                    name='amount'
                    className='inputBox'
                    value={data.amount}
                    onChange={handleChange} />

                <button
                    className='w-1/4 bg-slate-500 px-4 py-2 text-white rounded-md text-xl shadow-xl shadow-slate-500 border-2 border-black hover:bg-blue-400 hover:text-white transition-all duration-300 ease-in-out'
                    onClick={handleSubmit}
                >
                    Add</button>
                {loading && <Loader />}
            </div>
        </div>
    )
}
