import React, { useEffect, useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ImageGalleryComponent = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [circles, setCircles] = useState({});
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://e7ff-157-46-95-165.ngrok-free.app/building/video/2/frames/",
          {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "98547",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const imageData = await response.json();
        console.log("Full API Response:", imageData);

        if (imageData && imageData.frames) {
          console.log("Fetched Image Data:", imageData.frames);
          setImages(imageData.frames);
        } else {
          console.warn("Unexpected API response structure:", imageData);
        }
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [images.length, isPaused]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleEdit = () => {
    setIsEditing((prevEditing) => {
      const newEditingState = !prevEditing;
      setIsPaused(newEditingState); // Pause the slideshow if entering edit mode
      return newEditingState;
    });
  };

  const handleImageClick = () => {
    if (isEditing) {
      setIsEditing(false); // Exit editing mode on image click
      setIsPaused(false); // Resume the slideshow
    }
  };

  const drawCircle = (ctx, x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const handleCanvasClick = (e) => {
    if (isEditing) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      drawCircle(ctx, x, y);
      setCircles((prevCircles) => {
        const newCircles = { ...prevCircles };
        if (!newCircles[currentIndex]) {
          newCircles[currentIndex] = [];
        }
        newCircles[currentIndex].push({ x, y });
        return newCircles;
      });
    }
  };

  const renderImage = (imageObj, name) => {
    const url = `https://e7ff-157-46-95-165.ngrok-free.app${imageObj.url}`;
    console.log("Constructed Image URL:", url);
    return (
      <div style={{ position: "relative" }}>
        <img
          ref={imageRef}
          key={imageObj.url}
          src={url}
          alt={name}
          style={{ width: "100%", height: "auto", margin: "5px", cursor: isEditing ? "pointer" : "default" }}
          onClick={handleImageClick}
          onError={(e) => (e.target.style.display = "none")}
          onLoad={() => {
            const canvas = canvasRef.current;
            if (canvas && imageRef.current) {
              canvas.width = imageRef.current.offsetWidth;
              canvas.height = imageRef.current.offsetHeight;
              const ctx = canvas.getContext("2d");
              if (circles[currentIndex]) {
                circles[currentIndex].forEach((circle) => drawCircle(ctx, circle.x, circle.y));
              }
            }
          }}
        />
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: isEditing ? "auto" : "none",
          }}
        />
      </div>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        360 Degree Image Gallery
      </Typography>
      {images.length > 0 ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "600px",
            margin: "auto",
          }}
        >
          {renderImage(
            images[currentIndex],
            `360 Degree Image ${currentIndex}`
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrev}
            style={{
              position: "absolute",
              top: "50%",
              left: "0",
              transform: "translateY(-50%)",
            }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            style={{
              position: "absolute",
              top: "50%",
              right: "0",
              transform: "translateY(-50%)",
            }}
          >
            Next
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsPaused(!isPaused)}
            style={{
              position: "absolute",
              top: "90%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {isPaused ? "Resume" : "Pause"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEdit}
            style={{
              position: "absolute",
              top: "90%",
              right: "0",
              transform: "translateY(-50%)",
            }}
          >
            {isEditing ? "Stop Editing" : "Edit"}
          </Button>
        </div>
      ) : (
        <Typography>Loading images...</Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.history.back()}
        style={{ marginTop: "20px" }}
      >
        Back
      </Button>
    </div>
  );
};

export default ImageGalleryComponent;