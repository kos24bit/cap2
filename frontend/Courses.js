import { useEffect, useState } from "react";
import axios from "axios";

function Courses(){

const [courses,setCourses] = useState([]);

useEffect(()=>{

axios.get("http://localhost:5000/api/courses")
.then(res=>{
 setCourses(res.data);
});

},[]);

return(
<div>

<h2>Courses</h2>

{courses.map((course)=>(
<div key={course._id}>

<h3>{course.title}</h3>
<p>{course.description}</p>

</div>
))}

</div>
);

}

export default Courses;