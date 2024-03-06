import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ApplicationItem from "../../components/ApplicationItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications } from "../../redux/applicationsSlice";
import CircularIndeterminate from "../../components/LoadingPage";
import OutlinedAlerts from "../../components/ErrorComponent";
const steps = [
  "Select an application to choose training pipeline",
  "Select a pipeline to choose model",
  "Deploy Model",
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    result: { register, unregister },
    status,
  } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchApplications());
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box sx={{ width: "100%" }} justifyContent="flex-end">
          <Stepper activeStep={0} alternativeLabel>
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
            Registered Applications
          </Typography>
          <Box
            mt={2}
            sx={{ minHeight: "200px", maxHeight: "400px", overflowY: "auto" }}
          >
            {register.length > 0 ? (
              register.map((app, index) => (
                <ApplicationItem key={index} app={app} />
              ))
            ) : (
              <Typography>No Registered Applications</Typography>
            )}
          </Box>
          <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
            Unregistered Applications
          </Typography>
          <Box
            mt={2}
            sx={{ minHeight: "200px", maxHeight: "400px", overflowY: "auto" }}
          >
            {unregister.length > 0 ? (
              unregister.map((app, index) => (
                <ApplicationItem key={index} app={app} />
              ))
            ) : (
              <Typography>No Unregistered Applications</Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
