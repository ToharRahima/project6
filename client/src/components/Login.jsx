import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/register/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(inputs),
    })
      .then((res) => {
        if (!res.ok) {
          alert("Login failed!");
          throw new Error("Login failed!");
        }
        return res.json();
      })
      .then((data) => {
        console.log("data: ", data);
        if (data) {
          localStorage.setItem("currentUser", JSON.stringify(data));
          navigate(`/${data}`);
        }
      });
  };

  return (
    <>
      <div className="register">
        <h1>log in:</h1>
        <form>
          <label htmlFor="username">username</label>
          <input onChange={handleChange} type="text" name="username" />
          <label htmlFor="password">password</label>
          <input onChange={handleChange} type="text" name="password" />
          <input type="submit" value="submit" onClick={handleSubmit} />
        </form>
        <Link to="/signup">signup</Link>
      </div>
    </>
  );
}
