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
import { useDispatch, useSelector } from "react-redux";
const ModelItem = ({ app, application_Uid }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const handleSelectPipeline = () => {
    dispatch();
    navigate("/");
  };
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {app.model_name}
        </Typography>
        {expanded && (
          <div>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              UID: {app.model_uid}
            </Typography>
            <Typography color="text.secondary">
              Created Time: {app.model_created_time}
            </Typography>
            <Typography color="text.secondary">
              Description: {app.model_description}
            </Typography>
            <Typography color="text.secondary">
              Version: {app.model_version}
            </Typography>
            <Typography color="text.secondary">
              File Extension: {app.model_file_extension}
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

export default ModelItem;
