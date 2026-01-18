import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.firstName.trim().length < 3)
      newErrors.firstName = "First name must be at least 3 characters";

    if (formData.lastName.trim().length < 3)
      newErrors.lastName = "Last name must be at least 3 characters";

    if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";

    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch("https://694a800a26e870772065b030.mockapi.io/users");
      const users = await res.json();

      const emailExists = users.some(
        (user) => user.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (emailExists) {
        setErrors({ email: "Email is already registered" });
        return;
      }

      const newUser = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      };

      const postRes = await fetch("https://694a800a26e870772065b030.mockapi.io/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (postRes.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="title">Divinéra</p>
      <p className="message">Register .</p>

      <div className="flex">
        <label>
          <input
            className="input"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <span>Firstname</span>
          {errors.firstName && (
            <p className="error-msg text-danger">{errors.firstName}</p>
          )}
        </label>

        <label>
          <input
            className="input"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <span>Lastname</span>
          {errors.lastName && (
            <p className="error-msg text-danger">{errors.lastName}</p>
          )}
        </label>
      </div>

      <label>
        <input
          className="input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <span>Email</span>
        {errors.email && (
          <p className="error-msg text-danger">{errors.email}</p>
        )}
      </label>

      <label>
        <input
          className="input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <span>Password</span>
        {errors.password && (
          <p className="error-msg text-danger">{errors.password}</p>
        )}
      </label>

      <label>
        <input
          className="input"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <span>Confirm password</span>
        {errors.confirmPassword && (
          <p className="error-msg text-danger">{errors.confirmPassword}</p>
        )}
      </label>

      <button className="submit" type="submit">
        Submit
      </button>

      <p className="signin">
        Already have an acount ? <a href="/login">Signin</a>
      </p>
    </form>
  );
}

export default Register;

