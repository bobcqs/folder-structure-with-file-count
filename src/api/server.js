import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export function getCars(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        }).then((response) => {
            resolve(response.data);
        })
            .catch((error) => {
                reject(error);
            });
    });
}





