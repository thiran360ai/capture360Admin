import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const CreatePlanDataPage = () => {
  const [planId, setPlanId] = useState("");
  const [image, setImage] = useState(null);
  const [floorOrName, setFloorOrName] = useState(""); // Updated variable name
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
    formData.append("floor_or_name", floorOrName); // Use updated variable name
    formData.append("no_of_employees", noOfEmployees);
    formData.append("description", description);

    try {
      const response = await fetch("https://6081-2409-408d-3e91-34f1-cc8f-590c-8f98-7c3b.ngrok-free.app/building/plan_details/", {
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
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
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
          label="Floor or Name" // Updated label
          value={floorOrName} // Use updated variable name
          onChange={(e) => setFloorOrName(e.target.value)} // Update state with the new variable
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
          <Button variant="contained" color="primary" component="span">
            Upload Image
          </Button>
        </label>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
          Submit
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={message === "Successfully submitted" ? "success" : "error"}>
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default CreatePlanDataPage;
