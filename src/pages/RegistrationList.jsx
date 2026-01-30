import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData =
      JSON.parse(localStorage.getItem("registrations")) || [];

    console.log("Registrations from localStorage:", storedData);
    setData(storedData);
  }, []);

  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    localStorage.setItem("registrations", JSON.stringify(updatedData));
  };

  const handleEdit = (item) => {
    localStorage.setItem("editData", JSON.stringify(item));
    navigate("/registration");
  };

  return (
    <div className="container mt-4">
      <h3>Registration List</h3>

      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Work Shift</th>
            <th>Country</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No records found
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.gender}</td>
                <td>
                  {Array.isArray(item.workShift)
                    ? item.workShift.join(", ")
                    : item.workShift}
                </td>
                <td>{item.country}</td>
                <td>{item.city}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationList;
