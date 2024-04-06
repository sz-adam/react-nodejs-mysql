import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_READ}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid bg-primary vh-100 vw-100">
      <div className="row">
        <h3 className="text-center py-3">Students</h3>
        <div className="d-flex justify-content-end">
          <Link className="btn btn-success" to="/create">
            Add Student
          </Link>
        </div>
        <div className="container-fluid text-black  vh-100 vw-100 bg-primary d-flex justify-content-center align-items-center text-center">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student) => {
                return (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>{student.gender}</td>
                    <td>
                      <Link className="btn mx-2 btn-success m-2">Read</Link>
                      <Link className="btn mx-2 btn-success">Edit</Link>
                      <button className="btn mx-2 btn-danger">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
