import React, { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const registerUser = async (e) => {
    e.preventDefault();

    try {

      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role
      });

      alert("Registration successful");
      window.location.href = "/";

    } catch (error) {

      alert("Registration failed");
      console.error(error);

    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={registerUser}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <br/><br/>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <br/><br/>

        <select
          value={role}
          onChange={(e)=>setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>

        <br/><br/>

        <button type="submit">Register</button>

      </form>
    </div>
  );
}

export default Register;
