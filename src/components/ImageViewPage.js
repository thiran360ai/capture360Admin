import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const ImageViewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageUrl, name } = location.state || {};
<<<<<<< HEAD
  const [dots, setDots] = useState([]);
=======
  const [clickPositions, setClickPositions] = useState([]);

  const fullImageUrl = `https://5c55-2409-408d-1e08-1bc8-9c9d-bdc6-29a1-7760.ngrok-free.app/${imageUrl}`;
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738

  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setDots([...dots, { x, y }]);
  };

  const handleDotClick = (index) => {
    // Implement your editing logic here
    console.log(`Edit dot ${index}`);
  };

  return (
<<<<<<< HEAD
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height
      margin: 0,
      padding: '20px',
      backgroundColor: "whitesmoke"
    }}>
=======
    <div style={{background: 'linear-gradient(135deg, #71b7e6, #9b59b6)'}}>
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Box
        style={{
          position: "relative",
          display: "inline-block",
          maxWidth: "100%",
          maxHeight: "80vh", // Limit the height of the image
        }}
        onClick={handleImageClick}
      >
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: "180%",
            height: "180",
            display: "block",
          }}
        />
        {dots.map((dot, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: dot.y,
              left: dot.x,
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        style={{ marginTop: '20px',width: "180px" }}
      >
        Back
      </Button>
    </div>
  );
};

export default ImageViewPage;
