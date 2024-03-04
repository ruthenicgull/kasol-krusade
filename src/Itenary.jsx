import React, { useEffect, useState } from "react";
import styles from "./Itenary.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import data from "./itenary.json";

function Itenary() {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(data);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.accordions_list}>
        {list.map((day) => (
          <div key={day.id} className={styles.item}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${day.id}-content`}
                id={`panel${day.id}-header`}
              >
                <strong>{day.title}</strong>
              </AccordionSummary>
              <AccordionDetails>
                {day.data.map((item) => (
                  <li className={styles.list_item} key={item.id}>
                    {item}
                  </li>
                ))}
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itenary;
