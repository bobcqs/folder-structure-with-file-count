export const change = (limit)=>{
    var size = "";
    if(limit < 0.1 * 1024){                            
        size = limit.toFixed(2) + "B"
    }else if(limit < 0.1 * 1024 * 1024){            
        size = (limit/1024).toFixed(2) + "KB"
    }else if(limit < 0.1 * 1024 * 1024 * 1024){        
        size = (limit/(1024 * 1024)).toFixed(2) + "MB"
    }else{                                            
        size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
    }

    var sizeStr = size + "";                        
    var index = sizeStr.indexOf(".");                    
    var dou = sizeStr.substr(index + 1 ,2)           
    if(dou == "00"){                               
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    return size;
}


export const dfs = (tree) =>{
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

