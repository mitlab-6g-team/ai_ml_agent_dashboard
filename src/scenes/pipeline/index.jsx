import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PipelineItem from "../../components/PipelineItem";

const steps = [
  "Select an application to choose training pipeline",
  "Select a pipeline to choose model",
  "Deploy Model",
];
const fakeData = [
  {
    pipeline_uid: "UID789",
    pipeline_time: "2023-01-01T00:00:00Z",
    pipeline_description: "Description for Pipeline 1",
    pipeline_name: "Pipeline 1",
  },
  {
    pipeline_uid: "UID000",
    pipeline_created_time: "2023-02-01T00:00:00Z",
    pipeline_description: "Description for Pipeline 2",
    pipeline_name: "Pipeline 2",
  },
];
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box sx={{ width: "100%" }} justifyContent="flex-end">
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{ color: "blue" }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
      <Box>
        {fakeData.map((app, index) => (
          <PipelineItem key={index} app={app} />
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
