import React, { useEffect, useState } from "react";
import FileTree from "./FileTree";
import { getCars } from "../api/server";
import '../styles/File.css'

export const transferBytesFormat = (limit) => {
    let fileSize = "";
    if(limit < 0.1 * 1024) {
        fileSize = limit.toFixed(2) + "B"
    } else if(limit < 0.1 * 1024 * 1024) {
        fileSize = (limit/1024).toFixed(2) + "KB"
    } else if(limit < 0.1 * 1024 * 1024 * 1024) {
        fileSize = (limit/(1024 * 1024)).toFixed(2) + "MB"
    } else {
        fileSize = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
    }

    let sizeStr = fileSize + "";
    let index = sizeStr.indexOf(".");
    let lastTwoDigit = sizeStr.substr(index + 1 ,2)

    if(lastTwoDigit === "00") {
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }

    return fileSize;
}

export  const hideFileFormat = (filesName)=>{
    if(filesName.length === 0) return filesName
    let fileArray= filesName.split(".")
    let fileLength = fileArray.length
    let fileNameWithoutFormat = fileArray.splice(0,fileLength>1?fileLength-1:fileLength).join(".")
    return fileNameWithoutFormat
}

export const calculateTotalFilesSize = fileTree => {
    let filesSize  = 0
    const currentObject = (file) => {
        file.forEach(object => {
            if(object.type === 'file') {
                filesSize += object.size
            } else {
                currentObject(object.children)
            }
        })
    }
    currentObject(fileTree)
    return filesSize
}

export const calculateTotalFilesNumber = fileTree => {
    let filesNumber = 0
    const currentObject = (file) => {
        file.forEach(object => {
            if(object.type === 'file') {
                filesNumber += 1
            } else {
                currentObject(object.children)
            }
        })
    }
    currentObject(fileTree)
    return filesNumber
}

export const File = () => {
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
                setError("Unsuccessful request");
            });
    }, []);
    return (
        <div>
            <div>
                {
                    item.length
                        ? item.map((item, index) => {
                            return <FileTree key={index} data={item.children} name={item.name} type={item.type} />;
                        })
                        : null
                }
                {error ? <div>{error}</div> : ""}
                <hr className="divider" />
                <div className="file-summary">
                    <div className="summary-text">Total Files：{filesNumber}</div>
                    <div className="summary-text">Total Filesize：{transferBytesFormat(filesSize)}</div>
                </div>
            </div>
        </div>
    );
}

