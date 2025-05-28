import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ModelScreen() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
  const typeId = localStorage.getItem("vehicleTypeId");

  useEffect(() => {
    if (!typeId) {
      navigate("/type");
      return;
    }

    const fetchVehicles = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/vehicles?typeId=${typeId}`);
        setVehicles(res.data);
      } catch (err) {
        console.error("Failed to fetch vehicles", err);
      }
    };

    fetchVehicles();
  }, [typeId, navigate]);

  const handleSelect = (vehicle) => {
    localStorage.setItem("vehicleId", vehicle.id);
    localStorage.setItem("vehicleName", vehicle.name); // assuming vehicle has name
    navigate("/date");
  };

  return (
    <div>
      <h2>Select a Vehicle</h2>
      {vehicles.length > 0 ? (
        <ul>
          {vehicles.map((v) => (
            <li key={v.id}>
              <button onClick={() => handleSelect(v)}>{v.name}</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading vehicles...</p>
      )}
    </div>
  );
}
