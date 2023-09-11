import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../Components/Header'
import axios from "axios";
import Loader from "../Components/Loader";
import ExpenseHeader from "../Components/ExpenseHeader";
import ExpenseTable from "../Components/ExpenseTable";
import { toast } from "react-hot-toast";
import React from "react";
export default function Home() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const email = JSON.parse(localStorage.getItem("user"))?.email;
    // const dispatch = useDispatch();
    useEffect(() => {
        const auth = () => {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
            }
            setLoading(false);
        }

        const getData = async () => {
            try {
                setLoading(true);
                await axios.get(process.env.REACT_APP_BASE_URL + `/expense/get/${email}`)
                    .then(res => res.data)
                    .then(data => setData(data))
                    .catch(e => {
                        toast.error("Server Error");
                    });
                setLoading(false);
            }
            catch (e) {
                console.log(e);
            };
        }

        auth();
        getData();

    }, []);
    return (
        <>
            <Header />
            <ExpenseHeader data={data} />
            <ExpenseTable data={data} />
            {loading && <Loader />
            }
        </>
    )
}
