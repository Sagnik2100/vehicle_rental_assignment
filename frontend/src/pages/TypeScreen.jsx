import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TypeScreen() {
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  // 1. Get wheels from localStorage
  const wheels = localStorage.getItem("wheels");

  // 2. Fetch vehicle types on component mount
  useEffect(() => {
    if (!wheels) {
      navigate("/wheels"); // fallback if user skips wheels selection
      return;
    }

    const fetchTypes = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/vehicles/types?wheels=${wheels}`);
        setTypes(res.data);
      } catch (err) {
        console.error("Failed to fetch types", err);
      }
    };

    fetchTypes();
  }, [wheels, navigate]);

  // 3. Handle user selection
  const handleSelectType = (type) => {
    localStorage.setItem("vehicleTypeId", type.id);
    localStorage.setItem("vehicleTypeName", type.name);
    navigate("/model");
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-semibold mb-6">Select a vehicle type</h2>
      <div className="flex justify-center flex-wrap gap-4">
        {types.length > 0 ? (
          types.map((type) => (
            <button
              key={type.id}
              onClick={() => handleSelectType(type)}
              className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600"
            >
              {type.name}
            </button>
          ))
        ) : (
          <p className="text-gray-600">Loading types...</p>
        )}
      </div>
    </div>
  );
}
