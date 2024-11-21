import React, { useState, useEffect } from "react";

export default function File(props) {
  const [showInfo, setshowInfo] = useState(false);
  const [info, setInfo] = useState("");
  const [edit, setEdit] = useState(false);
  const [newname, setNewname] = useState("");
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
          setInfo(data);
        }
      } catch (err) {
        console.log("err: ", err);
      }
    };
    getInfo();
  }, [showInfo]);

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
      <button onClick={() => setshowInfo((prev) => !prev)}>
        {showInfo ? "hide info" : "show info"}
      </button>
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
        <button onClick={() => props.rename(props.name, newname, setEdit)}>
          save
        </button>
      ) : (
        <button onClick={() => setEdit((prev) => !prev)}>edit</button>
      )}
    </>
  );
}
