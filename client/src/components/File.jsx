import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function File(props) {
  const navigate = useNavigate();
  console.log(props);
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
  function deleteFolder() {
    fetch(`http://localhost:8080/folder/${username}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ foldername: props.name }),
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

  function showContent(filename) {
    navigate(`${filename}`);
  }
  return (
    <>
      <div className={info.type === "file" ? "file" : "folder"}>
        {edit ? (
          <input
            value={newname || props.name}
            type="text"
            onChange={(e) => setNewname(e.target.value)}
          />
        ) : (
          <h2>{props.name}</h2>
        )}
        {info.type === "file" ? (
          <button onClick={deleteFile}>
            delete file
            <img
              width="40"
              height="auto"
              src="https://www.shutterstock.com/image-vector/trash-can-icon-symbol-delete-260nw-1454137346.jpg"
              alt="Delete"
            />
          </button>
        ) : (
          <button onClick={deleteFolder}>
            delete folder
            <img
              width="40"
              height="auto"
              src="https://www.shutterstock.com/image-vector/trash-can-icon-symbol-delete-260nw-1454137346.jpg"
              alt="Delete"
            />
          </button>
        )}
        <button onClick={() => setshowInfo((prev) => !prev)}>
          {showInfo ? "hide info" : "show info "}
        </button>

        {info.type === "file" && (
          <button onClick={() => showContent(props.name)}>show content</button>
        )}
        {showInfo && (
          <p>
            <strong>details:</strong>
            <br />
            size:{JSON.stringify(info.details.size)}
            <br />
            birthtime:{JSON.stringify(info.details.birthtime)}
            <br />
            type:{info.type}
          </p>
        )}
        {edit ? (
          <button
            onClick={async () =>
              await props.rename(props.name, newname, setEdit)
            }
          >
            save
          </button>
        ) : (
          <button onClick={() => setEdit((prev) => !prev)}>
            edit
            <img
              width="40"
              height="auto"
              src="https://logowik.com/content/uploads/images/888_edit.jpg"
              alt="Edit"
            />
          </button>
        )}
      </div>
    </>
  );
}
