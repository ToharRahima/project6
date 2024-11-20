import React from "react";

export default function Signup() {
  
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/signup", {
      method: 'POST', headers: { "content-type": "application/json" }
      , body: JSON.stringify(inputs)
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Login failed!');
      }
      return res.json();  // Parse the JSON response
    })
    .then((data) => {
      console.log('data: ', data);
      if (data) {  // Check if the username exists in the response
        navigate(`/${data}`);  // Navigate to the username's page
      }
    })
  }

  return (
    <>
      <h1>sign up:</h1>
      <form>
        <label htmlFor="username" >username</label>
        <input onChange={handleChange} type="text" name="username" />
        <label htmlFor="password">password</label>
        <input onChange={handleChange} type="text" name="password" />
        <input type="submit" value="submit" onClick={handleSubmit} />
      </form>
    </>
  );
}

