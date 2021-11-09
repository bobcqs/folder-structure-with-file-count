import { useState, useEffect } from "react";
import axios from "axios";
import FileTree from './FileTree';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

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
      <div>
        <FileTree cars={posts} />
      </div>
  );
}