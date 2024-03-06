import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PipelineItem from "../../components/PipelineItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModles } from "../../redux/modelsSlice";
import CircularIndeterminate from "../../components/LoadingPage";
import OutlinedAlerts from "../../components/ErrorComponent";
import { useLocation } from "react-router-dom";

const steps = [
  "Select an application to choose training pipeline",
  "Select a pipeline to choose model",
  "Deploy Model",
];

const ModelPage = () => {
  const location = useLocation();
  const { training_pipeline_uid } = location.state || {};
  const dispatch = useDispatch();
  // const { result, status } = useSelector((state) => state.models);
  useEffect(() => {
    dispatch(fetchModles(training_pipeline_uid));
  }, []);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box sx={{ width: "100%" }} justifyContent="flex-end">
          <Stepper activeStep={2} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
      {/* {status === "loading" && (
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
              <Typography>No registered applications</Typography>
            )}
          </Box>
        </Box>
      )} */}
    </Box>
  );
};

export default ModelPage;
