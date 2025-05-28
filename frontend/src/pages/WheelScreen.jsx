import React from "react";
import { useNavigate } from "react-router-dom";

export default function WheelsScreen() {
const navigate = useNavigate();

const handleSelect = (wheels) => {
localStorage.setItem("wheels", wheels);
navigate("/type");
};

return (
<div>
<h2>How many wheels?</h2>
<div>
<button onClick={() => handleSelect(2)}>2 Wheels</button>
<button onClick={() => handleSelect(4)}>4 Wheels</button>
</div>
</div>
);
}