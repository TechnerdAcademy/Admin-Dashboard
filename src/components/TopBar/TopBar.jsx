import React, { useState } from "react";
import "./TopBar.css";
import { NotificationsNone, Settings, Close } from "@mui/icons-material";
import {
  Modal,
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topbarLeft">
          <h2 className="logo">MADAN Dashboard</h2>
        </div>
        <div className="topbarRight">
          {/* <div className="topbarRightIconWrapper">
            <NotificationsNone sx={{ color: "var(--sidebar-text-color)" }} />
            <span className="iconBadge">2</span>
          </div> */}
          <div className="topbarRightIconWrapper" onClick={handleOpen}>
            <Settings sx={{ color: "var(--sidebar-text-color)" }} />
          </div>
          <img
            src="https://media.istockphoto.com/id/1320653933/photo/handsome-middle-aged-man-looking-at-camera.jpg?s=1024x1024&w=is&k=20&c=zxgREH3D9siF9lgH3_s2LUsRYxFDv68TCVds4sv20Gc="
            alt=""
            className="topRightAvatar"
          />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 450,
            bgcolor: "background.paper",
            borderRadius: "20px",
            boxShadow: 24,
            p: 4,
            outline: "none",
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "var(--sidebar-text-color)",
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="profile settings tabs"
            textColor="primary"
            indicatorColor="primary"
            centered
          >
            <Tab label="Edit Profile" {...a11yProps(0)} />
            {/* <Tab label="Logout" {...a11yProps(1)} /> */}
          </Tabs>
          <TabPanel value={value} index={0}>
            <form noValidate autoComplete="off">
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                variant="outlined"
                sx={{ color: "var(--sidebar-text-color)" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Email"
                variant="outlined"
                sx={{ color: "var(--sidebar-text-color)" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Current Password"
                type="password"
                variant="outlined"
                sx={{ color: "var(--sidebar-text-color)" }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                sx={{ color: "var(--sidebar-text-color)" }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  borderRadius: "10px",
                  fontSize: "12px",
                  padding: "6px 12px",
                }}
              >
                Save
              </Button>
            </form>
          </TabPanel>
          {/* <TabPanel value={value} index={1}>
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%", // Ensures it takes up the full height of the TabPanel
      textAlign: "center", // Centers the text horizontally
    }}
  >
    <Typography sx={{ mb: 2 }}>Are you sure you want to logout?</Typography>
    <Button
      variant="contained"
      color="error"
      sx={{
        borderRadius: "20px",
        fontSize: "14px",
        padding: "10px 20px",
        backgroundColor: "#d32f2f",
        "&:hover": {
          backgroundColor: "#b71c1c",
        },
        textTransform: "none",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  </Box>
</TabPanel> */}
        </Box>
      </Modal>
    </div>
  );
}
