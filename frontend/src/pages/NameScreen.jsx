import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NameScreen() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      alert("Please enter both first and last names.");
      return;
    }

    // Save to localStorage
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);

    navigate("/wheels");
  };

  return (
    <div>
      <h2>Enter Your Name</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}
