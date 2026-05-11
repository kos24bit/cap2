import React, { useEffect, useState } from "react";
import axios from "axios";

function Courses(){

const [courses,setCourses] = useState([]);

useEffect(()=>{

    axios.get("http://localhost:5000/api/courses")
    .then(res=>{
        setCourses(res.data);
    })
    .catch(err=>{
        console.log(err);
    });

},[]);

return(
<div>

<h2>Courses</h2>

{courses.map(course=>(
    <div key={course._id} style={{border:"1px solid gray",padding:"10px",margin:"10px"}}>

        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <p>Instructor: {course.instructor}</p>
        <p>Average Rating: {course.averageRating}</p>

    </div>
))}

</div>
);

}

export default Courses;