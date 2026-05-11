import React, {useState} from "react";
import axios from "axios";

function MyCourses(){

const [studentId,setStudentId] = useState("");
const [courses,setCourses] = useState([]);

const loadCourses = ()=>{

axios
.get(`http://localhost:5000/api/access/student/${studentId}`)
.then(res=>{
    setCourses(res.data);
});

};

return(

<div>

<h2>My Courses</h2>

<input
placeholder="Enter Student ID"
value={studentId}
onChange={(e)=>setStudentId(e.target.value)}
/>

<button onClick={loadCourses}>Load My Courses</button>

<hr/>

{courses.map(course=>(
<div key={course._id} style={{border:"1px solid gray",padding:"10px",margin:"10px"}}>

<h3>{course.title}</h3>
<p>{course.description}</p>

</div>
))}

</div>

);

}

export default MyCourses;