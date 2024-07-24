import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ImageViewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageUrl, name } = location.state || {};
  const [clickPositions, setClickPositions] = useState([]);

  const fullImageUrl = `https://e7ff-157-46-95-165.ngrok-free.app/${imageUrl}`;

  const handleImageClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setClickPositions((prevPositions) => [...prevPositions, { x: offsetX, y: offsetY }]);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src={fullImageUrl}
          alt={name}
          style={{ width: "300px", height: "auto", cursor: "pointer" }}
          onClick={handleImageClick}
        />
        {clickPositions.map((pos, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${pos.y}px`,
              left: `${pos.x}px`,
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)"
            }}
          />
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </div>
  );
};

export default ImageViewPage;
