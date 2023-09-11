import React from 'react';
import { NewtonsCradle } from '@uiball/loaders'

const Loader = () => {

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
            <NewtonsCradle
                size={40}
                speed={1.4}
                color="black"
            />
        </div>
    );
};

export default Loader;
