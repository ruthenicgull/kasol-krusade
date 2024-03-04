import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styles from "./Details.module.css";

export default function Details() {
  const [value, setValue] = React.useState("1");

  const tabStyle = {
    color: "black",
    fontFamily: `"Poppins", sans-serif`,
  };
  const panelStyle = {
    color: "white",
    fontFamily: `"Poppins", sans-serif`,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> Trip Details </h2>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          margin: "0.5rem",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              borderRadius: "0.5rem",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" sx={tabStyle} />
              <Tab label="Item Two" value="2" sx={tabStyle} />
              <Tab label="Item Three" value="3" sx={tabStyle} />
            </TabList>
          </Box>
          <TabPanel value="1" sx={panelStyle}>
            Item One
          </TabPanel>
          <TabPanel value="2" sx={panelStyle}>
            Item Two
          </TabPanel>
          <TabPanel value="3" sx={panelStyle}>
            Item Three
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
