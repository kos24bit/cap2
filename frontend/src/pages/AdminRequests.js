import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminRequests() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/requests"
      );

      setRequests(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  const approveRequest = async (id) => {
    await axios.put(
      `http://localhost:5000/api/requests/${id}/approve`
    );
    fetchRequests();
  };

  const rejectRequest = async (id) => {
    await axios.put(
      `http://localhost:5000/api/requests/${id}/reject`
    );
    fetchRequests();
  };

  return (
    <div>
      <h2>Admin Requests</h2>

      {requests.map((req) => (
        <div key={req._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>

          <p><strong>Student:</strong> {req.user.name}</p>
          <p><strong>Email:</strong> {req.user.email}</p>
          <p><strong>Course:</strong> {req.course.title}</p>
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

export default AdminRequests;