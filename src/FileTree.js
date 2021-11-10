import React, { useState, useEffect } from 'react';

function initialState(cars) {
    const result = { ...cars };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (typeof value === 'object' && value !== null) {
        result[key].__isOpen = false;
        }
    });
    return result;
}

function FileTree({ cars }) {
    const [obj, setObj] = useState(initialState(cars));
    const keys = Object.keys(obj);
    console.log('keys: ', keys);

    useEffect(() => {
        setObj(initialState(cars));
    }, [cars]);

    const handleClickFolder = (key) => {
        setObj({
            ...obj,
            [key]: {
                ...obj[key],
                __isOpen: !obj[key].__isOpen,
            },
        });
    };

    return (
        <div>
            {keys.map((key) => {
                const value = obj[key];
                if (typeof value === 'object' && value !== null) {
                    return (
                        <div key={key}>
                            <span onClick={() => handleClickFolder(key)}>{`[${
                                obj[key].__isOpen ? 'CLOSESSS' : 'OPENNN'
                            }] `}</span>
                            {key}
                            {obj[key].__isOpen && <FileTree cars={obj[key]} />}
                        </div>
                    );
                } else {
                    return (
                        <div key={key}>
                        {key}: {obj[key]}
                        </div>
                    );
                    }
            })}
        </div>
    );
}

export default FileTree;
