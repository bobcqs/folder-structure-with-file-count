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

    return (
        <h1>Test</h1>
    )
}

export default FileTree;
