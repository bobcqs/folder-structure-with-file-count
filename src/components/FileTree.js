import React, {Component,useState} from 'react';
import './FileTree.css'
import {change} from "../api/utils";

function FileTree(props){
    const {data,name,type,size} = props
    const [isShow,setIsShow] = useState(false)
    const click = (e)=>{
        console.log(data)
        setIsShow(()=> !isShow)
        e.stopPropagation();
    }
    return (
        <div>
            <ul>
                <li onClick={click}>
                
                <div className={'folder-content'}>
                        <div className="file">
                        </div>
                        <span>{name}  {type==="folder"?null:change(size)}</span>
                    </div>
                    <div>
                        <span>{name}</span>
                    </div>
            {data.length?
                data.map((item) =>{
                    return (
                                <div className={isShow?"active":"hiden"}>
                                    {item.children?.length?<FileTree data={item.children} name={item.name} type={item.type}/>:
                                        <FileTree data={[]} name={item.name} type={item.type} size={item.size}/>
                                    }
                                </div>
                    )
                }):
                null
            }
                </li>
            </ul>
        </div>
    );
}

export default FileTree;
