import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styles from "./Details.module.css";
import PaymentDetails from "./PaymentDetails";
import Itenary from "./Itenary";

export default function Details() {
  const [value, setValue] = React.useState("1");

  const tabStyle = {
    color: "black",
    fontFamily: `"Poppins", sans-serif`,
    fontSize: "0.8rem",
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
          marginTop: "1rem",
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
              <Tab label="Payment" value="1" sx={tabStyle} />
              <Tab label="Itenary" value="2" sx={tabStyle} />
              <Tab label="Sights" value="3" sx={tabStyle} />
            </TabList>
          </Box>
          <TabPanel value="1" sx={panelStyle}>
            <PaymentDetails />
          </TabPanel>
          <TabPanel value="2" sx={panelStyle}>
            <Itenary />
          </TabPanel>
          <TabPanel value="3" sx={panelStyle}>
            Item Three
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
