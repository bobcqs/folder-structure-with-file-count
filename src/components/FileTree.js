import React, {useState} from 'react';
import '../style/FileTree.css'
import {transferBytesFormat} from "./Files";

function FileTree(props){
    const {data,name,type,size} = props
    const [isShow,setIsShow] = useState(false)
    const click = (e)=>{
        setIsShow(()=> !isShow)
        e.stopPropagation();
    }
    return (
        <div>
            <ul>
                <li onClick={click}>
                <div className={'folder-content'}>
                        <div className={type==="folder"?"floder":"hiden"}>
                            <i className={`icon-font icon-down ${isShow? '' : 'rotate'}`}></i>
                        </div>
                        <div className="file">
                            <i className={`icon-font icon-size ${type === "folder"? isShow? "icon-24gf-folderOpen" : "icon-24gf-folderMinus" : 'icon-wj-jjwj'}`}></i>
                        </div>
                        <span>{ name }{type === "folder"? null : transferBytesFormat(size)}</span>
                    </div>
            {data.length?
                data.map((item,index) =>{
                    return (<div className={isShow?"active":"hiden"} key={index}>
                                    {
                                        item.children?.length?<FileTree data={item.children} name={item.name} type={item.type}/>:
                                        <FileTree data={[]} name={item.name} type={item.type} size={item.size}/>
                                    }
                            </div>)}) : null
            }
                </li>
            </ul>
        </div>
    );
}

export default FileTree;
