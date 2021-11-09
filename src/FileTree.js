import React, { useState, useEffect } from 'react';

function initialState(initialObj) {
    const result = { ...initialObj };
    Object.keys(results).forEach((key) => {
        const value = result[key];
        if (typeof value === 'object' && value !== null) {
            result[key].__isOpen = false;
        }
    })
}

export default ObjectKeys;
