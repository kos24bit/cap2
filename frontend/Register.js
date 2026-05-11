import { useState } from "react";
import axios from "axios";

function Register(){

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [role,setRole] = useState("learner");

const register = async () => {

 await axios.post("http://localhost:5000/api/auth/register",{
  name,
  email,
  password,
  role
 });

 alert("Registration successful");
};

return(
<div>

<h2>Register</h2>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<select onChange={(e)=>setRole(e.target.value)}>

<option value="learner">Learner</option>
<option value="faculty">Faculty</option>

</select>

<button onClick={register}>Register</button>

</div>
);

}

export default Register;