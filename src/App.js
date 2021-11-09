import { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="App">
      <div>
        {posts.length
          ? posts.map((post) => {
              return <div key={post.id}>{post.name}</div>;
            })
          : null}
      </div>
      {error ? <div>{error}</div> : ""}
    </div>
  );
}
