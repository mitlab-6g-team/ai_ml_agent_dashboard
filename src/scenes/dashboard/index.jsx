import { Box, Typography } from "@mui/material";
// import { tokens } from "../../theme";
import Header from "../../components/Header";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ApplicationItem from "../../components/ApplicationItem";
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications } from "../../redux/applicationsSlice";
const steps = [
  "Select an application to choose training pipeline",
  "Select a pipeline to choose model",
  "Deploy Model",
];
const fakeData = [
  {
    application_uid: "UID123",
    application_created_time: "2023-01-01T00:00:00Z",
    application_description: "Description for Application 1",
    application_name: "Application 1",
  },
  {
    application_uid: "UID456",
    application_created_time: "2023-02-01T00:00:00Z",
    application_description: "Description for Application 2",
    application_name: "Application 2",
  },
  ...Array.from({ length: 10 }).map((_, index) => ({
    application_uid: `UID${index + 457}`,
    application_created_time: `2023-${String(index + 3).padStart(
      2,
      "0"
    )}-01T00:00:00Z`,
    application_description: `Description for Application ${index + 3}`,
    application_name: `Application ${index + 3}`,
  })),
];

const transformedData = {
  result: {
    register: fakeData.slice(0, 6),
    unregister: fakeData.slice(6, 12),
  },
};
const Dashboard = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const {
    result: { register, unregister },
    status,
  } = useSelector((state) => state.applications);
  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);
  // const registeredApps = transformedData.result.register.slice(0, 5);
  // const unregisteredApps = transformedData.result.unregister.slice(0, 5);
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
      <Typography variant="h6" color="primary" gutterBottom>
        Registered Applications
      </Typography>
      <Box
        mt={2}
        sx={{ minHeight: "200px", maxHeight: "300px", overflowY: "auto" }}
      >
        {register.length > 0 ? (
          register.map((app, index) => (
            <ApplicationItem key={index} app={app} />
          ))
        ) : (
          <Typography>No registered applications</Typography>
        )}
      </Box>
      <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
        Unregistered Applications
      </Typography>
      <Box
        mt={2}
        sx={{ minHeight: "200px", maxHeight: "300px", overflowY: "auto" }}
      >
        {unregister.length > 0 ? (
          unregister.map((app, index) => (
            <ApplicationItem key={index} app={app} />
          ))
        ) : (
          <Typography>No unregistered applications</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
