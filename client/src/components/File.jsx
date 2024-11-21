import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//TO DO:
export default function File(props) {
  const navigate=useNavigate()
  console.log(props);
  const [showInfo, setshowInfo] = useState(false);
  const [info, setInfo] = useState("");
  const [edit, setEdit] = useState(false);
  const [newname, setNewname] = useState("");
  let username = JSON.parse(localStorage.getItem("currentUser"));
  function deleteFile() {
    fetch(`http://localhost:3000/users/${username}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ filename: props.name }),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error("couldnt delete");
        }
        return res.json(); // Parse the JSON response
      })
      .then(
        props.setFolderContent((prev) =>
          prev.filter((file) => file !== props.name)
        )
      );
    console.log("setFolderContent: ", setFolderContent);
  }

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
          setInfo(data);
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
      {edit ? (
        <input
          value={newname || props.name}
          type="text"
          onChange={(e) => setNewname(e.target.value)}
        />
      ) : (
        <h1>{props.name}</h1>
      )}

      <button onClick={deleteFile}>delete file</button>
      <button onClick={() => setshowInfo((prev) => !prev)}>
        {showInfo ? "hide info" : "show info"}
      </button>
      <button onClick={()=>showContent(props.name)}>show content</button>
      {showInfo && (
        <p>
          <strong>details:</strong>
          <br />
          size:{JSON.stringify(info.size)}
          <br />
          birthtime:{JSON.stringify(info.birthtime)}
          <br />
          mode:{JSON.stringify(info.mode)}
          <br />
        </p>
      )}
      {edit ? (
        <button onClick={async() => await props.rename(props.name, newname, setEdit)}>
          save
        </button>
      ) : (
        <button onClick={() => setEdit((prev) => !prev)}>edit</button>
      )}
    </>
  );
}
