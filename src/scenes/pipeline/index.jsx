import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
// import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
// import Box from '@mui/material/Box';
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PipelineItem from "../../components/PipelineItem";
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
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
                <StepLabel sx={{color:"blue"}}>{label}</StepLabel>
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
