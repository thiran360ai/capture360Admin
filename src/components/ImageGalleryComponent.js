import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ImageGalleryComponent = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [images, setImages] = useState([]);
  const [leftImages, setLeftImages] = useState([]); // Separate state for left panel images
  const [rightImages, setRightImages] = useState([]); // Separate state for right panel images
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [circles, setCircles] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [videoDetails, setVideoDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSplitScreen, setIsSplitScreen] = useState(false);
  const [currentPanel, setCurrentPanel] = useState('left'); // Track which panel is currently active

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (id) {
      fetchImages(id);
    } else {
      console.error("id is undefined.");
    }
  }, [id]);

  const fetchImages = async (id) => {
    try {
      const response = await fetch(
        `https://4aae-157-49-242-245.ngrok-free.app/building/video/${id}/frames/`,
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
      if (imageData && imageData.frames) {
        setImages(imageData.frames);
        if (!isSplitScreen) {
          setLeftImages(imageData.frames); // Initialize left side images
        }
      } else {
        console.warn("Unexpected API response structure:", imageData);
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  useEffect(() => {
    if (!isPaused && images.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [images.length, isPaused]);

  useEffect(() => {
    if (dialogOpen) {
      const fetchVideoDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            "https://4aae-157-49-242-245.ngrok-free.app/building/api/video/details/",
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

          const data = await response.json();
          if (Array.isArray(data)) {
            setVideoDetails(data);
          } else {
            console.warn("Unexpected API response structure:", data);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchVideoDetails();
    }
  }, [dialogOpen]);

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

  const handlePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused); // Toggle pause state
  };

  const handleImageClick = () => {
    if (isEditing) {
      setIsEditing(false); // Exit editing mode on image click
      setIsPaused(false); // Resume the slideshow
    }
  };

  const handleDialogOpen = (panel) => {
    setCurrentPanel(panel); // Set the current panel
    setDialogOpen(true); // Open the dialog for selecting a date
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
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
    const url = `https://4aae-157-49-242-245.ngrok-free.app${imageObj.url}`;
    const timestamp = imageObj.timestamp || "Unknown Date"; // Assuming imageObj.timestamp contains the date

    return (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
        }}
      >
        <Typography
          variant="caption"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: "4px",
            zIndex: 1,
          }}
        >
          {timestamp}
        </Typography>
        <img
          ref={imageRef}
          key={imageObj.url}
          src={url}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            cursor: isEditing ? "pointer" : "default",
          }}
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

  const handleSplitScreenToggle = () => {
    setIsSplitScreen((prev) => !prev);
  };

  const fetchImagesByDate = async (id, date, panel) => {
    try {
      const response = await fetch(
        `https://4aae-157-49-242-245.ngrok-free.app/building/video/${id}/frames/?date=${encodeURIComponent(date)}`,
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
      if (imageData && imageData.frames) {
        if (panel === 'left') {
          setLeftImages(imageData.frames);
        } else if (panel === 'right') {
          setRightImages(imageData.frames);
        }
      } else {
        console.warn("Unexpected API response structure:", imageData);
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  return (
    <div>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={handlePrev}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
        <Button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</Button>
        <Button onClick={handlePause}>{isPaused ? "Resume" : "Pause"}</Button>
        <Button onClick={handleSplitScreenToggle}>
          {isSplitScreen ? "Single View" : "Split Screen"}
        </Button>
      </ButtonGroup>
      <div
        style={{
          display: "flex",
          flexDirection: isSplitScreen ? "row" : "column",
          height: "80vh", // Adjust as needed
          width: "100%",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {leftImages.length > 0 && renderImage(leftImages[currentIndex], leftImages[currentIndex].name)}
          {isSplitScreen && (
            <Button
              onClick={() => handleDialogOpen('left')}
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                zIndex: 1,
              }}
            >
              Change Date (Left)
            </Button>
          )}
        </div>
        {isSplitScreen && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {rightImages.length > 0 && renderImage(rightImages[currentIndex], rightImages[currentIndex].name)}
            {isSplitScreen && (
              <Button
                onClick={() => handleDialogOpen('right')}
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  zIndex: 1,
                }}
              >
                Change Date (Right)
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Dialog for selecting date */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Select Date</DialogTitle>
        <DialogContent>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography color="error">Error: {error}</Typography>
          ) : (
            <div>
              {videoDetails.map((video) => (
                <Button
                  key={video.id}
                  onClick={() => {
                    const date = video.uploaded_date || video.upload_date || "Unknown";
                    fetchImagesByDate(video.id, date, currentPanel); // Fetch new images for the selected date on the current panel
                    setSelectedDate(date);
                    handleDialogClose();
                  }}
                  style={{ margin: "4px", width: "100%" }}
                >
                  {video.uploaded_date || video.upload_date || "Unknown"} - {video.id}
                </Button>
              ))}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageGalleryComponent;
