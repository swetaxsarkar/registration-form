import { useEffect, useState } from "react";
import Select from "react-select";

function RegistrationForm() {
  // ---------------- BASIC FORM STATE ----------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "91",
    phone: "",
    gender: "",
    workShift: []
  });

  // ---------------- COUNTRY / CITY STATE ----------------
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  // ---------------- QUALIFICATION STATE ----------------
  const [qualifications, setQualifications] = useState([
    { degreeName: "", passingYear: 1900 }
  ]);

  // ---------------- FETCH COUNTRY API ----------------
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((res) => res.json())
      .then((data) => {
        const countryOptions = data.data.map((item) => ({
          label: item.country,
          value: item.country,
          cities: item.cities
        }));
        setCountries(countryOptions);
      })
      .catch((err) => console.error("Country API Error:", err));
  }, []);

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShiftChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      workShift: checked
        ? [...prev.workShift, value]
        : prev.workShift.filter((s) => s !== value)
    }));
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    const cityOptions = country.cities.map((city) => ({
      label: city,
      value: city
    }));
    setCities(cityOptions);
    setSelectedCities([]);
  };

  // ---------------- QUALIFICATION HANDLERS ----------------
  const handleQualificationChange = (index, field, value) => {
    const updated = [...qualifications];
    updated[index][field] = value;
    setQualifications(updated);
  };

  const addQualification = () => {
    setQualifications([
      ...qualifications,
      { degreeName: "", passingYear: 1900 }
    ]);
  };

  const removeQualification = (index) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      country: selectedCountry?.value,
      cities: selectedCities.map((c) => c.value),
      qualifications
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(finalData);
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
    setSelectedCountry(null);
    setCities([]);
    setSelectedCities([]);
    setQualifications([{ degreeName: "", passingYear: 1900 }]);
  };

  // ---------------- JSX ----------------
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

                {/* Country */}
                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <Select
                    options={countries}
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    placeholder="Select Country"
                  />
                </div>

                {/* City */}
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <Select
                    options={cities}
                    value={selectedCities}
                    onChange={setSelectedCities}
                    isMulti
                    isDisabled={!selectedCountry}
                    placeholder={
                      selectedCountry
                        ? "Select City"
                        : "Select country first"
                    }
                  />
                </div>

                {/* Qualifications */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Qualifications</label>

                  {qualifications.map((q, index) => (
                    <div className="row mb-2" key={index}>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Degree Name"
                          value={q.degreeName}
                          onChange={(e) =>
                            handleQualificationChange(
                              index,
                              "degreeName",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Passing Year"
                          min="1900"
                          max={new Date().getFullYear()}
                          value={q.passingYear}
                          onChange={(e) =>
                            handleQualificationChange(
                              index,
                              "passingYear",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>

                      <div className="col-md-2">
                        {qualifications.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeQualification(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn btn-secondary mt-2"
                    onClick={addQualification}
                  >
                    + Add Qualification
                  </button>
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
