import { useState, useEffect } from "react";
import FileTree from './components/FileTree'
import './style/App.css'
import {getCars} from './api/server'
import {transferBytesFormat,calculateFileSizeAndNumber} from './components/Files'

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [fileSize,setFileSize] = useState(0)
  const [fileNum,setFileNum] = useState(0)

  useEffect(() => {
      getCars("https://dev21.becollective.com/api/v2/coding-challenges/dirs")
          .then((response) => {
          setPosts(response);
          let res = calculateFileSizeAndNumber(response)
          setFileSize(res[0])
          setFileNum(res[1])
      })
          .catch((error) => {
              console.log(error);
              setError("we have received an error");
          });
  }, []);

  return (
          <div  className="App">
          <div className="container">
              {posts.length
                  ? posts.map((post,index) => {
                      return <FileTree key={index} data={post.children} name={post.name} type={post.type}/>;
                  })
                  : null}
              {error ? <div>{error}</div> : ""}
              <div className="sum-box">
                  <h2>Total Files:{fileNum}</h2>
                  <h2>Total Filesize:{transferBytesFormat(fileSize)}</h2>
              </div>
          </div>
      </div>
      );
}
