import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
<<<<<<< HEAD
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
=======
import "./CreateDataPage.css";
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738

const CreateDataPage = ({ onClose }) => {
  const [project, setProjectId] = useState("");
  const [image, setImage] = useState(null);
  const [totalFloors, setTotalFloors] = useState("");
  const [noOfEmployees, setNoOfEmployees] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("project", project);
    formData.append("image", image);
    formData.append("total_floors", totalFloors);
    formData.append("no_of_employees", noOfEmployees);
    formData.append("description", description);

    try {
<<<<<<< HEAD
      const response = await fetch("https://3973-2409-4072-6e8f-befe-7c12-7ad2-88f1-629a.ngrok-free.app/building/create_project_list/", {
=======
      const response = await fetch("https://5c55-2409-408d-1e08-1bc8-9c9d-bdc6-29a1-7760.ngrok-free.app//building/create_project_list/", {
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setMessage("Successfully submitted");
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          onClose();
          navigate("/"); // Redirect after 3 seconds
        }, 3000);
      } else {
        setMessage("Failed to submit");
        setOpen(true);
      }
    } catch (error) {
      setMessage("Error submitting data");
      setOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
<<<<<<< HEAD
    <Card style={{ maxWidth: 1000, margin: "auto", marginTop: 30 ,}}>
      <CardContent style={{width: '450px',boxShadow: "0 8px 16px rgba(0,0,0,0.2)",backgroundColor:'#efebe9',borderRadius: 8}}>
        <Typography variant="h6" gutterBottom style={{ marginBottom: 30,textAlign: "center", 
          fontSize: '28px',}}> <span style={{ textDecoration: 'underline', color: 'GrayText' }}>
          Create Project List Data
          </span>
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TextField
            label="Project"
            value={project}
            onChange={(e) => setProjectId(e.target.value)}
            fullWidth
            margin="normal"
            required
            style={{ backgroundColor: "#ffffff", borderRadius: 4 }}
            size="small"
          />
          <TextField
            label="Total Floors"
            value={totalFloors}
            onChange={(e) => setTotalFloors(e.target.value)}
            fullWidth
            margin="normal"
            required
            style={{ backgroundColor: "#ffffff", borderRadius: 4 }}
            size="small"
          />
          <TextField
            label="Number of Employees"
            value={noOfEmployees}
            onChange={(e) => setNoOfEmployees(e.target.value)}
            fullWidth
            margin="normal"
            required
            style={{ backgroundColor: "#ffffff", borderRadius: 4 }}
            size="small"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            required
            style={{ backgroundColor: "#ffffff", borderRadius: 4 }}
            size="small"
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="upload-image">
            <Button
              variant="contained"
              color="primary"
              component="span"
              style={{color: "#ffffff", margin: "10px 0", borderRadius: 4 }}
              size="small"
            >
              Upload Image
            </Button>
          </label>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{color: "#ffffff", margin: "10px 0", borderRadius: 4 }}
            size="small"
          >
            Submit
          </Button>
        </form>
      </CardContent>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseSnackbar} style={{ bottom: 50 }}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
=======
    <div className="create-data-page-container">
      <Typography variant="h4" gutterBottom className="create-data-page-title">
        Create Project List Data
      </Typography>
      <form onSubmit={handleSubmit} className="create-data-page-form">
        <TextField
          label="Project"
          value={project}
          onChange={(e) => setProjectId(e.target.value)}
          fullWidth
          margin="normal"
          required
          className="create-data-page-text-field"
        />
        <TextField
          label="Total Floors"
          value={totalFloors}
          onChange={(e) => setTotalFloors(e.target.value)}
          fullWidth
          margin="normal"
          required
          className="create-data-page-text-field"
        />
        <TextField
          label="Number of Employees"
          value={noOfEmployees}
          onChange={(e) => setNoOfEmployees(e.target.value)}
          fullWidth
          margin="normal"
          required
          className="create-data-page-text-field"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
          className="create-data-page-text-field"
        />
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-image"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="upload-image">
          <Button
            variant="contained"
            color="primary"
            component="span"
            className="create-data-page-upload-button"
          >
            Upload Image
          </Button>
        </label>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="create-data-page-submit-button"
        >
          Submit
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        className="create-data-page-snackbar"
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
          severity={message === "Successfully submitted" ? "success" : "error"}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </Card>
  );
};

export default CreateDataPage;
