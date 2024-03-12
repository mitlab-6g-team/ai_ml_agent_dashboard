import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Backdrop,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { fetchRemoveApplciation } from "../redux/removeapplicationSlice";
import { useDispatch } from "react-redux";
import { fetchApplications } from "../redux/applicationsSlice";
const ApplicationItem = ({
  app,
  deployStatus,
  processApp,
  removeStatus,
  removeApp,
}) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const handleSelectPipeline = () => {
    navigate("/pipeline", { state: { application_uid: app.application_uid } });
  };
  const handleRemoveDeployment = () => {
    dispatch(fetchRemoveApplciation({ application_Uid: app.application_uid }));
    // dispatch(fetchApplications());
    navigate("/result");
  };
  useEffect(() => {
    const isDeploying =
      deployStatus === "loading" && processApp === app.application_uid;
    const isRemoving =
      removeStatus === "loading" && removeApp === app.application_uid;

    // 將loading設置為true，如果任一操作正在進行
    setLoading(isDeploying || isRemoving);
  }, [deployStatus, processApp, removeStatus, removeApp]);
  return (
    <Card variant="outlined" sx={{ mb: 2, position: "relative" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {app.application_name}
        </Typography>
        {expanded && (
          <div>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              UID: {app.application_uid}
            </Typography>
            <Typography color="text.secondary">
              Created Time: {app.application_created_time}
            </Typography>
            <Typography color="text.secondary">
              Description: {app.application_description}
            </Typography>
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button size="medium" onClick={toggleExpand} color="secondary">
          {expanded ? "Hide Details" : "Show Details"}
        </Button>
        <Button size="medium" color="secondary" onClick={handleSelectPipeline}>
          Select PipeLine
        </Button>
        <Button size="medium" color="error" onClick={handleRemoveDeployment}>
          Remove Deployment
        </Button>
      </CardActions>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
        open={loading}
      >
        <Box sx={{ width: "80%" }}>
          <LinearProgress color="secondary" />
        </Box>
      </Backdrop>
    </Card>
  );
};

export default ApplicationItem;
