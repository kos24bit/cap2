import { useState } from "react";
import API from "../services/api";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{

      const res = await API.post("/auth/register",{
        name,
        email,
        password,
        role
      });

      alert(res.data.message);

    }catch(err){
      alert("Registration failed");
    }

  };

  return (

    <div style={{padding:"20px"}}>

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

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
          <option value="instructor">Faculty - Instructor</option>
          <option value="admin">Admin</option>
        </select>

        <br/><br/>

        <button type="submit">Register</button>

      </form>

    </div>

  );

}

export default Register;