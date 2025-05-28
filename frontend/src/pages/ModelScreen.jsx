import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Button, Box } from "@mui/material";
import "../css/ModelScreen.css"; // Custom CSS

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
    localStorage.setItem("vehicleName", vehicle.name);
    navigate("/date");
  };

  return (
    <div className="form-container">
      <Box className="form-box">
        <Typography variant="h5" gutterBottom>
          Select a Vehicle
        </Typography>

        <div className="button-grid">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <Button
                key={vehicle.id}
                variant="contained"
                color="primary"
                onClick={() => handleSelect(vehicle)}
                className="model-button"
              >
                {vehicle.name}
              </Button>
            ))
          ) : (
            <Typography color="textSecondary">Loading vehicles...</Typography>
          )}
        </div>
      </Box>
    </div>
  );
}
