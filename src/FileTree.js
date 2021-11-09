import React, { useState, useEffect } from 'react';

function initialState(cars) {
    const result = { ...cars };
    Object.keys(results).forEach((key) => {
        const value = result[key];
        if (typeof value === 'object' && value !== null) {
            result[key].__isOpen = false;
        }
    })
}

function FileTree() {
  
}

export default ObjectKeys;
