import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './login.css'

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/", {
        email, password
      });

      if (response.data === "exist") {
        navigate("/home", { state: { email } });
      } else if (response.data === "notexist") {
        alert("User has not signed up");
      }
    } catch (error) {
      alert("Wrong details");
      console.error(error);
    }
  };

  return (
    <center>
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
        />
        <input type="submit" value="Login" />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/signup">Signup Page</Link>
    </div>
    </center>
  );
}

export default Login;
