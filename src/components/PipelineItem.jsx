import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const PipelineItem = ({ app, application_Uid }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const handleSelectPipeline = () => {
    navigate("/model", {
      state: {
        training_pipeline_uid: app.training_pipeline_uid,
        application_uid: application_Uid,
      },
    });
  };
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {app.training_pipeline_name}
        </Typography>
        {expanded && (
          <div>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              UID: {app.training_pipeline_uid}
            </Typography>
            <Typography color="text.secondary">
              Created Time: {app.training_pipeline_created_time}
            </Typography>
            <Typography color="text.secondary">
              Description: {app.training_pipeline_description}
            </Typography>
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button size="medium" onClick={toggleExpand} color="secondary">
          {expanded ? "Hide Details" : "Show Details"}
        </Button>
        <Button size="medium" color="secondary" onClick={handleSelectPipeline}>
          Select Model
        </Button>
      </CardActions>
    </Card>
  );
};

export default PipelineItem;
