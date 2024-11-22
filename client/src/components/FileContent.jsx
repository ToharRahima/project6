import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
export default function FileContent() {
  const [content, setContent] = useState("");
  // const [files, setFiles] = useState([]);
  const { username, file } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/users/${username}/${file}`)
      .then((res) => {
        if (!res.ok) throw new Error("couldnt get the file content");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setContent(data);
      });
  }, []);

  return (
    <>
      <h1>{file}:</h1>
      <h1>{content || "NO CONTENT!"}</h1>
    </>
  );
}
