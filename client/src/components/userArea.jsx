import React, { useState, useEffect } from "react";
import File from "./File";
export default function UserArea(props) {
  const [folderContent, setFolderContent] = useState([]);
  const [newFile, setNewFile] = useState("");

  // TODO: deal with cases when there is no currentUser
  let username = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const showFolder = async () => {
      if (!username) {
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:3000/users/${username}/display`
        );
        if (!res.ok) {
          throw Error("ERROR!");
        }
        const data = await res.json();
        console.log("data: ", data);
        setFolderContent(data);
      } catch (err) {
        console.log("err: ", err);
      }
    };
    showFolder();
  }, []);

  const addFile = async () => {
    if (newFile) {
      console.log("newFile: ", newFile);
      await fetch(`http://localhost:3000/users/${username}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ filename: newFile }),
      }).then((res) => {
        console.log("res: ", res);
        if (!res.ok) {
          throw new Error("somthing went wrong");
        } else {
          setFolderContent((prev) => [...prev, newFile]);
        }
      });
    }
  };

  {
    if (username) {
      return (
        <>
          <div id="addFile">
            <h2>add new file</h2>
            <input onChange={(e) => setNewFile(e.target.value)} />
            <button onClick={addFile}>+</button>
          </div>
          {folderContent.map((item) => (
            <File key={item} name={item} setFolderContent={setFolderContent}  />
          ))}
        </>
      );
    } else {
      return (
        <>
          <h1>you need to login first</h1>
        </>
      );
    }
  }
}
