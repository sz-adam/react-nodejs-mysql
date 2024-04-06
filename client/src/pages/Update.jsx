import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Update() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_SEE}/${id}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_EDIT}/${id}`,
        data[0]
      )
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid vh-100 vw-100 bg-primary d-flex justify-content-center align-items-center text-center">
      <div className="row">
        <h1>User {id}</h1>
        <div className="d-flex justify-content-end">
          <Link to="/" className="btn btn-success">
            Back
          </Link>
        </div>
        {data.map((student) => {
          return (
            <form onSubmit={handleSubmit} key={student.id}>
              <div
                className="form-group my-3 d-flex justify-content-around"
                style={{ fontWeight: "bold" }}
              >
                <label htmlFor="name">Name</label>
                <input
                  value={student.name}
                  type="text"
                  name="name"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], name: e.target.value }])
                  }
                />
              </div>
              <div
                className="form-group my-3 d-flex justify-content-around"
                style={{ fontWeight: "bold" }}
              >
                <label htmlFor="email">Email</label>
                <input
                  value={student.email}
                  type="email"
                  name="email"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], email: e.target.value }])
                  }
                />
              </div>
              <div
                className="form-group my-3 d-flex justify-content-around"
                style={{ fontWeight: "bold" }}
              >
                <label htmlFor="gender">Gender</label>
                <input
                  value={student.gender}
                  type="text"
                  name="gender"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], gender: e.target.value }])
                  }
                />
              </div>
              <div
                className="form-group my-3 d-flex justify-content-around"
                style={{ fontWeight: "bold" }}
              >
                <label htmlFor="age">Age</label>
                <input
                  value={student.age}
                  type="number"
                  name="age"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], age: e.target.value }])
                  }
                />
              </div>
              <div className="form-group my-3">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
}

export default Update;
