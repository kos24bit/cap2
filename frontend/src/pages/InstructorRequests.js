import React, { useEffect, useState } from "react";
import axios from "axios";

function InstructorRequests() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      console.error("No user found in localStorage");
      return;
    }

    fetchRequests(user._id);

  }, []);

  const fetchRequests = async (instructorId) => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/requests/instructor/${instructorId}`
      );

      console.log("Instructor requests:", res.data); // debug

      setRequests(res.data);

    } catch (error) {
      console.error("Error fetching requests:", error);
    }

  };

  const approveRequest = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/requests/${id}/approve`
      );

      const user = JSON.parse(localStorage.getItem("user"));
      fetchRequests(user._id);

    } catch (error) {
      console.error(error);
    }

  };

  const rejectRequest = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/requests/${id}/reject`
      );

      const user = JSON.parse(localStorage.getItem("user"));
      fetchRequests(user._id);

    } catch (error) {
      console.error(error);
    }

  };

  return (

    <div>

      <h2>Instructor Requests</h2>

      {requests.length === 0 && (
        <p>No requests found</p>
      )}

      {requests.map((req) => (

        <div
          key={req._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >

          <p><strong>Student:</strong> {req.user?.name}</p>

          <p><strong>Course:</strong> {req.course?.title}</p>

          <p><strong>Status:</strong> {req.status}</p>

          {req.status === "pending" && (
            <>
              <button onClick={() => approveRequest(req._id)}>
                Approve
              </button>

              <button onClick={() => rejectRequest(req._id)}>
                Reject
              </button>
            </>
          )}

        </div>

      ))}

    </div>

  );

}

export default InstructorRequests;