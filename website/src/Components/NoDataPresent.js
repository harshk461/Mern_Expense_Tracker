import React from 'react'
import NoData from '../Assets/nodata.gif'
export default function NoDataPresent() {
    return (
        <div>
            <img
                className='w-[300px] h-[200px] m-auto shadow-lg shadow-black rounded-md'
                src={NoData}
                alt="No Data Presents" />
        </div>
    )
}
