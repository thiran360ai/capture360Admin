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
import "./CreatePlanDataPage.css";
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738

const CreatePlanDataPage = () => {
  const [planId, setPlanId] = useState("");
  const [image, setImage] = useState(null);
  const [floorOrName, setFloorOrName] = useState("");
  const [noOfEmployees, setNoOfEmployees] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("plan_id", planId);
    formData.append("image", image);
    formData.append("floor_or_name", floorOrName);
    formData.append("no_of_employees", noOfEmployees);
    formData.append("description", description);

    try {
<<<<<<< HEAD
      const response = await fetch("https://3973-2409-4072-6e8f-befe-7c12-7ad2-88f1-629a.ngrok-free.app/building/plan_details/", {
=======
      const response = await fetch("https://5c55-2409-408d-1e08-1bc8-9c9d-bdc6-29a1-7760.ngrok-free.app/+/building/plan_details/", {
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setMessage("Successfully submitted");
        setOpen(true);
        setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
      } else {
        setMessage("Failed to submit");
        setOpen(true);
      }
    } catch (error) {
      setMessage("Error submitting data");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
<<<<<<< HEAD
    <Card style={{ maxWidth: 1000, margin: "auto", marginTop: 30 ,width: '380px'}}>
      <CardContent style={{width: '360px',boxShadow: "0 8px 16px rgba(0,0,0,0.2)",backgroundColor:'#efebe9',borderRadius: 8}}>
        <Typography variant="h6"
          color="primary" gutterBottom style={{ marginBottom: 30,textAlign: "center", 
          fontSize: '28px',textDecoration: 'underline', color: 'GrayText'}}> 
          {/* <span style={{ textDecoration: 'underline', color: 'GrayText' }}></span> */}
          Create Plan Details Data
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Plan ID"
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Floor or Name"
            value={floorOrName}
            onChange={(e) => setFloorOrName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Number of Employees"
            value={noOfEmployees}
            onChange={(e) => setNoOfEmployees(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="upload-image">
            <Button variant="contained" color="primary" component="span"
            style={{color: "#ffffff", margin: "10px 0", borderRadius: 4 }}>
              Upload Image
            </Button>
          </label>
          <Button type="submit" variant="contained" color="primary" style={{
            color: "#ffffff", margin: "10px 0", borderRadius: 4,  }}>
            Submit
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity={message === "Successfully submitted" ? "success" : "error"}
          >
            {message}
          </MuiAlert>
        </Snackbar>
      </CardContent>
    </Card>
=======
    <div className="create-plan-page-container">
      <Typography variant="h4" gutterBottom className="create-plan-page-title">
        Create Plan Details Data
      </Typography>
      <form onSubmit={handleSubmit} className="create-plan-page-form">
        <TextField
          label="Plan ID"
          value={planId}
          onChange={(e) => setPlanId(e.target.value)}
          fullWidth
          margin="normal"
          required
          className="create-plan-page-text-field"
        />
        <TextField
          label="Floor or Name" // Updated label
          value={floorOrName} // Use updated variable name
          onChange={(e) => setFloorOrName(e.target.value)} // Update state with the new variable
          fullWidth
          margin="normal"
          required
          className="create-plan-page-text-field"
        />
        <TextField
          label="Number of Employees"
          value={noOfEmployees}
          onChange={(e) => setNoOfEmployees(e.target.value)}
          fullWidth
          margin="normal"
          required
          className="create-plan-page-text-field"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
          className="create-plan-page-text-field"
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
            className="create-plan-page-upload-button"
          >
            Upload Image
          </Button>
        </label>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="create-plan-page-submit-button"
        >
          Submit
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        className="create-plan-page-snackbar"
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={message === "Successfully submitted" ? "success" : "error"}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
  );
};

export default CreatePlanDataPage;