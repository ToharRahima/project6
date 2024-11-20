import React, { useState, useEffect } from "react";
import File from "./File";
export default function UserArea(props) {
  const [folderContent, setFolderContent] = useState([]);
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
  {
    if (username) {
      return (
        <>
          <div>FOLDERS:</div>
          {folderContent.map((item) => (
            <File key={item} name={item} />
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
