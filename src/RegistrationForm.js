import { useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "91",
    phone: "",
    gender: "",
    workShift: []
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox change
  const handleShiftChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      workShift: checked
        ? [...prev.workShift, value]
        : prev.workShift.filter((shift) => shift !== value)
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");

    setFormData({
      name: "",
      email: "",
      countryCode: "91",
      phone: "",
      gender: "",
      workShift: []
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Registration Form</h3>

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <div className="input-group">
                    <span className="input-group-text">+</span>
                    <input
                      type="text"
                      name="countryCode"
                      className="form-control flex-grow-0"
                      style={{ maxWidth: "70px" }}
                      value={formData.countryCode}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="mb-3">
                  <label className="form-label">Gender</label><br />
                  {["Male", "Female", "Other"].map((g) => (
                    <div className="form-check form-check-inline" key={g}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label">{g}</label>
                    </div>
                  ))}
                </div>

                {/* Work Shift */}
                <div className="mb-3">
                  <label className="form-label">Work Shift</label>
                  {["Day", "Evening", "Night", "Weekend"].map((shift) => (
                    <div className="form-check" key={shift}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={shift}
                        checked={formData.workShift.includes(shift)}
                        onChange={handleShiftChange}
                      />
                      <label className="form-check-label">{shift}</label>
                    </div>
                  ))}
                </div>

                <button className="btn btn-primary w-100" type="submit">
                  Register
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
