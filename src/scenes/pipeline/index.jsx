import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PipelineItem from "../../components/PipelineItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPipelines } from "../../redux/pipelinesSlice";
import CircularIndeterminate from "../../components/LoadingPage";
import OutlinedAlerts from "../../components/ErrorComponent";
import { useLocation } from "react-router-dom";
const steps = [
  "Select an application to choose training pipeline",
  "Select a pipeline to choose model",
  "Deploy Model",
];

const PipelinePage = () => {
  const location = useLocation();
  const { application_uid } = location.state || {};
  const dispatch = useDispatch();
  const { result, status } = useSelector((state) => state.pipelines);
  useEffect(() => {
    dispatch(fetchPipelines(application_uid));
  }, []);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box sx={{ width: "100%" }} justifyContent="flex-end">
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
      {status === "loading" && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularIndeterminate />
        </Box>
      )}
      {status === "failed" && (
        <Box display="flex" justifyContent="center" my={4}>
          <OutlinedAlerts />
        </Box>
      )}
      {status === "succeeded" && (
        <Box>
          <Typography variant="h6" color="primary" gutterBottom>
            Select a training pipeline
          </Typography>
          <Box
            mt={2}
            sx={{ minHeight: "200px", maxHeight: "300px", overflowY: "auto" }}
          >
            {result.length > 0 ? (
              result.map((app, index) => <PipelineItem key={index} app={app} />)
            ) : (
              <Typography>No Training Pipeline to select</Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PipelinePage;
