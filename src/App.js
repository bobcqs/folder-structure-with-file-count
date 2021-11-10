import { useState, useEffect } from "react";
import axios from "axios";
import FileTree from './components/FileTree'
import {change} from './api/utils'

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [size,setSize] = useState(0)
  const [fileNum,setFileNum] = useState(0)

  useEffect(() => {
    axios
        .get("https://dev21.becollective.com/api/v2/coding-challenges/dirs")
        .then((response) => {
          console.log(response.data);
          setPosts(response.data);
        })
        .catch((error) => {
          console.log(error);
          setError("we have received an error");
        });
  }, []);

  return (
      <div  className="App">
          {posts.length
                      ? posts.map((post,index) => {
                        return <FileTree key={index} data={post.children} name={post.name} type={post.type}/>;
                      })
                      : null}
          {error ? <div>{error}</div> : ""}
          <div className="sum-box">
              <h2>Total Files:{fileNum}</h2>
              <h2>Total Filesize:{change(size)}</h2>
          </div>
      </div>
  );
}