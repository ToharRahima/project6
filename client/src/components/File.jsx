import React, { useState, useEffect } from "react";

export default function File(props) {
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
  return (
    <>
      <h1>{props.name}</h1>
      <button onClick={() => setshowInfo((prev) => !prev)}>
        {showInfo ? "hide info" : "show info"}
      </button>
    </>
  );
}
