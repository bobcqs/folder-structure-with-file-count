import React, {useEffect, useState} from "react";
import FileTree from "./FileTree";
import {getCars} from "../api/server";

export const transferBytesFormat = (limit)=>{
    let size = "";
    if(limit < 0.1 * 1024){                            
        size = limit.toFixed(2) + "B"
    }else if(limit < 0.1 * 1024 * 1024){            
        size = (limit/1024).toFixed(2) + "KB"
    }else if(limit < 0.1 * 1024 * 1024 * 1024){       
        size = (limit/(1024 * 1024)).toFixed(2) + "MB"
    }else{                                           
        size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
    }
    let sizeStr = size + "";                        
    let index = sizeStr.indexOf(".");                   
    let dou = sizeStr.substr(index + 1 ,2)            
    if(dou === "00"){                                
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    return size;
}

export const calculateFileSizeAndNumber = (tree) =>{
    let num = 0
    let size = 0
    const rec = (n) => {
        n.forEach(c => {
            if(c.type === 'file'){
                num +=1
                size += c.size
            }else{
                rec(c.children)
            }

        })
    }
    rec(tree)
    return [size,num]
}

export const File = ()=> {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [filesSize,setFilesSize] = useState(0)
    const [filesNumber,setFilesNumber] = useState(0)

    useEffect(() => {
        getCars()
            .then((response) => {
                setPosts(response.data);
                setFilesSize(calculateFileSizeAndNumber(response.data))
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
                    posts.length
                        ? posts.map((post,index) => {
                            return <FileTree key={index} data={post.children} name={post.name} type={post.type}/>;
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

