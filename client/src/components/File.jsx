import React from "react";
import { useParams } from "react-router-dom";
//TO DO:
export default function File(props) {
  const params = useParams(); 
  function deleteFile(){
    fetch(`http://localhost:3000/users/${params.username}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({filename:props.name})
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error("couldnt delete");
        }
        return res.json(); // Parse the JSON response
      })
      .then(()=>props.setFolderContent((prev)=>prev.filter(file=>file!==props.name))
        )
      };
  

  console.log(props);
  return (
    <>
      <h1>{props.name}</h1>
      <button onClick={deleteFile}>delete file</button>
    </>
  );
}
