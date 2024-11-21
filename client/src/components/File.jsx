import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function File(props) {
  const [showInfo, setshowInfo] = useState(false);
  const [info, setInfo] = useState("");
  const [edit, setEdit] = useState(false);
  const [newname, setNewname] = useState("");
  let username = JSON.parse(localStorage.getItem("currentUser"));

  function deleteFile() {
    fetch(`http://localhost:8080/users/${username}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ filename: props.name }),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error("couldnt delete");
        }
        return res.json();
      })
      .then(
        props.setFolderContent((prev) =>
          prev.filter((file) => file !== props.name)
        )
      );
  }

  useEffect(() => {
    const getInfo = async () => {
      if (!username) {
        return;
      }
      console.log("username: ", username);
      try {
        const res = await fetch(
          `http://localhost:8080/users/${username}/${props.name}/info`
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
        <h2>{props.name}</h2>
      )}

      <button onClick={deleteFile}>
        {" "}
        <img
          width="40"
          height="auto"
          src="https://www.shutterstock.com/image-vector/trash-can-icon-symbol-delete-260nw-1454137346.jpg"
          alt="Delete"
        />
      </button>
      <button onClick={() => setshowInfo((prev) => !prev)}>
        {showInfo ? "hide info" : "show info "}
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
        <button onClick={() => setEdit((prev) => !prev)}>
          <img
            width="40"
            height="auto"
            src="https://logowik.com/content/uploads/images/888_edit.jpg"
            alt="Edit"
          />
        </button>
      )}
    </>
  );
}
