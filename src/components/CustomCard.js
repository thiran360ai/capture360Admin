import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "./customcards.css";

const CustomCard = ({ title, content, apiEndpoint, onCreateData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiEndpoint, {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "98547",
        },
      });
      const data = await response.json();
      navigate("/data", { state: { title, data, apiEndpoint } });
    } catch (error) {
      setError(`Failed to fetch ${title} data: ${error.message}`);
      console.error(`Failed to fetch ${title} data:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="card-container">
      <CardContent className="card-content">
        <Typography variant="h5" className="card-title">{title}</Typography>
        <Typography variant="body2" className="card-body">{content}</Typography>
        {error && <Typography variant="body2" className="error-message">{error}</Typography>}
        <div className="button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchData}
            className="card-button"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Fetch Data"}
          </Button>
          {onCreateData && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/create-plan")}
              className="card-button"
            >
              Create Data
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
