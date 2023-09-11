import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            axios.post(process.env.REACT_APP_BASE_URL + "/api/users/login", data)
                .then(res => res.data)
                .then(data => {
                    if (data.status === 'success') {
                        const token = data.token;
                        const name = data.name;
                        const email = data.email;
                        const user = { name: name, email: email };
                        localStorage.setItem("token", token);
                        localStorage.setItem("user", JSON.stringify(user));
                        navigate("/");
                    }
                    else if (data.status === 'error') {
                        alert(data.message);
                    }
                })
                .catch((e) => {
                    alert(e.message);
                    navigate("/login");
                });
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div
                className='p-4 flex flex-col bg-blue-400 rounded-md shadow-xl shadow-black w-1/4'>
                <h1 className='text-xl'>Email</h1>
                <input
                    type="text"
                    className='inputBox'
                    placeholder='test@mail.com'
                    name="email"
                    value={data.email}
                    onChange={handleChange} />

                <div className="divder h-[15px]"></div>
                <h1 className='text-xl'>Password</h1>
                <input
                    type="password"
                    className='inputBox'
                    value={data.password}
                    name='password'
                    placeholder='*********'
                    onChange={handleChange} />
                <div className="divder h-[35px]"></div>

                <button
                    className='w-2/3 mx-auto bg-blue-800 shadow-md shadow-zinc-400 p-2 rounded-md text-xl text-white'
                    onClick={handleSubmit}
                >Login</button>

                <div className="divder h-[35px]"></div>
                <button
                    className='w-2/3 mx-auto bg-white border-4 border-black shadow-md shadow-zinc-400 p-2 rounded-md text-xl text-black'>Sign In with Google</button>

                <div className="divder h-[20px]"></div>
                <a href="/forgot" className='text-white hover:text-blue-950 transition-all ease-in-out duration-300'>Forgot Password?</a>
            </div>
            {loading && <Loader />}
        </div>
    )
}
