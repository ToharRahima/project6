import React from "react";
import {useState} from "react"
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//TO DO:
export default function File(props) {
  const navigate=useNavigate()
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
  const [showInfo, setshowInfo] = useState(false);
  const [info, setInfo] = useState("");
  let username = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const getInfo = async () => {
      if (!username) {
        return;
      }
      console.log("username: ", username);
      try {
        const res = await fetch(
          `http://localhost:3000/users/${username}/${props.name}/info`
        );
        console.log("res: ", res);
        if (!res.ok) {
          throw Error("ERROR!");
        } else {
          const data = await res.json();
          console.log("data file: ", data);
        }
      } catch (err) {
        console.log("err: ", err);
      }
    };
    getInfo();
  }, [showInfo]);

  function showContent(filename){
    navigate(`${filename}`)
  }
  return (
    <>
      <h1>{props.name}</h1>
      <button onClick={deleteFile}>delete file</button>
      <button onClick={() => setshowInfo((prev) => !prev)}>
        {showInfo ? "hide info" : "show info"}
      </button>
      <button onClick={()=>showContent(props.name)}>show content</button>
    </>
  );
}
