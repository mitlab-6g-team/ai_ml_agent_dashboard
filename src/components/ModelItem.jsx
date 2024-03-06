import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const ApplicationItem = ({ app }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate(); 
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const handleSelectPipeline = () => {
    navigate('/pipeline'); // 步驟3：導航到/pipeline頁面
  };
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {app.pipeline_name}
        </Typography>
        {expanded && (
          <div>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              UID: {app.pipeline_uid}
            </Typography>
            <Typography color="text.secondary">
              Created Time: {app.pipeline_created_time}
            </Typography>
            <Typography color="text.secondary">
              Description: {app.pipeline_description}
            </Typography>
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={toggleExpand} color="secondary">
          {expanded ? "Hide Details" : "Show Details"}
        </Button>
        <Button size="small" color="secondary" onClick={handleSelectPipeline}>
          Deploy Model
        </Button>
      </CardActions>
    </Card>
  );
};

export default ApplicationItem;
