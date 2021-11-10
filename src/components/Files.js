import React, {useEffect, useState} from "react";
import FileTree from "./FileTree";
import { getCars } from "../api/server";

export const transferBytesFormat = (limit)=>{
    let fileSize = "";
    if(limit < 0.1 * 1024) {                            
        fileSize = limit.toFixed(2) + "B"
    }else if(limit < 0.1 * 1024 * 1024) {            
        fileSize = (limit/1024).toFixed(2) + "KB"
    }else if(limit < 0.1 * 1024 * 1024 * 1024) {       
        fileSize = (limit/(1024 * 1024)).toFixed(2) + "MB"
    }else {                                           
        fileSize = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
    }
    let sizeStr = fileSize + "";                        
    let index = sizeStr.indexOf(".");                   
    let dou = sizeStr.substr(index + 1 ,2)            
    if(dou === "00"){                                
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    return fileSize;
}

export const calculateTotalFilesSize = (tree) =>{
    let filesSize  = 0
    const rec = (n) => {
        n.forEach(object => {
            if(object.type === 'file'){
                filesSize += object.size
            }else{
                rec(object.children)
            }
        })
    }
    rec(tree)
    return filesSize
}

export const calculateTotalFilesNumber = (tree) =>{
    let filesNumber = 0
    const rec = (n) => {
        n.forEach(object => {
            if(object.type === 'file'){
                filesNumber += 1
            }else{
                rec(object.children)
            }
        })
    }
    rec(tree)
    return filesNumber
}

export const File = ()=> {
    const [item, setItem] = useState([]);
    const [error, setError] = useState("");
    const [filesSize,setFilesSize] = useState(0)
    const [filesNumber,setFilesNumber] = useState(0)

    useEffect(() => {
        getCars()
            .then((response) => {
                setItem(response.data);
                setFilesSize(calculateTotalFilesSize(response.data))
                setFilesNumber(calculateTotalFilesNumber(response.data))
            })
            .catch((error) => {
                console.log(error);
                setError("we have received an error");
            });
    }, []);
    return (
        <div  className="App">
            <div className="container">
                {
                    item.length
                        ? item.map((item, index) => {
                            return <FileTree key={index} data={item.children} name={item.name} type={item.type}/>;
                        })
                        : null
                }
                {error ? <div>{error}</div> : ""}
                <div className="sum-box">
                    <h2>Total Files：{filesNumber}</h2>
                    <h2>Total Filesize：{transferBytesFormat(filesSize)}</h2>
                </div>
            </div>
        </div>
    );
}

