import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Faqs.module.css";
import data from "./faqs.json";

function Faqs() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(data);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        <span>F</span>requently <span>A</span>sked <span>Q</span>uestions
      </h2>
      <div className={styles.accordions_list}>
        {list.map((item) => (
          <div key={item.id}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${item.id}-content`}
                id={`panel${item.id}-header`}
              >
                <strong>{item.question}</strong>
              </AccordionSummary>
              <AccordionDetails>{item.answer}</AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faqs;
