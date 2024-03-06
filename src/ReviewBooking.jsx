import React, { useState } from "react";
import styles from "./ReviewBooking.module.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function ReviewBooking() {
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState("");

  function handleReferenceChange(event) {
    setReference(event.target.value);
  }

  async function checkStatus() {
    const q = query(
      collection(db, "bookings"),
      where("refId", "==", reference)
    );
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);

    let verification = "";

    querySnapshot.forEach((doc) => {
      verification = doc.data().verificationStatus;
    });

    if (verification == "") {
      setStatus("nf");
      return;
    }

    setStatus(verification);
  }

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <label htmlFor="refId">Reference Id</label>
        <input
          className={styles.field}
          type="text"
          id="refId"
          onChange={handleReferenceChange}
        />
        <button
          className={`${styles.field} ${styles.button}`}
          onClick={checkStatus}
        >
          Review
        </button>
        {status == "nf" && <p style={{ color: "lightcoral" }}>Not Found</p>}
        {status == "not verified" && (
          <>
            <p style={{ color: "yellow" }}>{status}</p>
            <p>Your booking has been recorded but not verified</p>
          </>
        )}
        {status == "verified" && (
          <p style={{ color: "lightgreen" }}>{status}</p>
        )}
        {status == "invalid" && (
          <>
            <p style={{ color: "red" }}>{status}</p>
            <p>Your payment could not be processed.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ReviewBooking;
