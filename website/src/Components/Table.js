import React from 'react'
import NoDataPresent from './NoDataPresent';

export default function Table(props) {
    const data = props.data;
    const filter = props.filter;
    const filterData = data.filter((item) => {
        const date = new Date(item.date);
        const titleMatch = filter.input === '' || item.title.includes(filter.input);
        const categoryMatch = filter.category === 'All' || item.category.toLowerCase() === filter.category.toLowerCase() || filter.category === '';
        const yearMatch = filter.year === 'all' || date.getFullYear().toString() === filter.year || filter.year === '';
        const monthMatch = filter.month === '0' || (date.getMonth() + 1).toString() === filter.month || filter.month === '';

        return titleMatch && categoryMatch && yearMatch && monthMatch;
    });

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return date.toLocaleDateString('en-US', options);
    }


    const sortedData = filterData.sort((a, b) => {
        if (filter.sort === '1') {
            return b.amount - a.amount;
        } else if (filter.sort === '2') {
            return a.amount - b.amount;
        }
        else if (filter.sort === '4') {
            if (new Date(a.date) < new Date(b.date)) {
                return -1;
            } else if (new Date(a.date) > new Date(b.date)) {
                return 1;
            }
        }
        else if (filter.sort === '3') {
            if (new Date(a.date) > new Date(b.date)) {
                return -1;
            } else if (new Date(a.date) < new Date(b.date)) {
                return 1;
            }
            return 0;
        }
        else {
            return 0;
        }
    });

    const finalData = sortedData.map(item => ({
        ...item,
        date: formatDate(item.date),
    }));


    return (
        <div className='w-full'>
            {filterData.length === 0 ? (
                <NoDataPresent />
            ) : (
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="tr">
                                            Title
                                        </th>
                                        <th className="tr">
                                            Description
                                        </th>
                                        <th className="tr">
                                            Category
                                        </th>
                                        <th className="tr">
                                            Amount
                                        </th>
                                        <th className="tr">
                                            Created On
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {finalData.map((item) => (
                                        <tr key={item._id}>
                                            <td className='td'>
                                                {item.title}
                                            </td>
                                            <td className='td'>
                                                {item.description}
                                            </td>
                                            <td className='td'>
                                                {item.category}
                                            </td>
                                            <td className='td'>
                                                {item.amount}
                                            </td>
                                            <td className='td'>
                                                {item.date}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
