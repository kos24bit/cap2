import React, { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      const { token, user } = res.data;

      // Save token and user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful");

      // Redirect based on role
      if (user.role === "admin") {
        window.location.href = "/admin";
      }
      else if (user.role === "instructor") {
        window.location.href = "/instructor";
      }
      else {
        window.location.href = "/courses";
      }

    } catch (err) {

      alert("Login failed");
      console.error(err);

    }

  };

  return (

    <div>

      <h2>Login</h2>

      <form onSubmit={loginUser}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;