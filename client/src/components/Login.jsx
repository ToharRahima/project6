import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <h1>login:</h1>
      <form action="http://localhost:3000/login" method="POST">
        <label for="username">username</label>
        <input type="text" name="username" />
        <label for="password">password</label>
        <input type="text" name="password" />
        <input type="submit" value="submit" />
      </form>
      <Link to="/signup">signup</Link>
    </>
  );
}
