import React, { useState } from "react";
import styles from "./ReviewBooking.module.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function ReviewBooking() {
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [undertaking, setUndertaking] = useState("");

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
    let bookingName = "";
    let undertakingStatus = "";

    querySnapshot.forEach((doc) => {
      verification = doc.data().verificationStatus;
      bookingName = doc.data().name;
      undertakingStatus = doc.data().undertaking;
    });

    if (verification == "") {
      setStatus("nf");
      return;
    }

    setName(bookingName);
    setUndertaking(undertakingStatus);
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
        {status.toLowerCase() == "nf" && (
          <>
            <p style={{ color: "lightcoral" }}>Not Found</p>
            <p>There is no booking record with this reference id.</p>
          </>
        )}
        {status == "not verified" && (
          <>
            <p>
              <strong>Name</strong>: {name.toUpperCase()}
            </p>
            <p>
              <strong>Undertaking Status</strong>: {undertaking.toUpperCase()}
            </p>
            <p style={{ color: "yellow" }}>{status.toUpperCase()}</p>
            <p>Your booking has been recorded but not verified</p>
          </>
        )}
        {status.toLowerCase() == "verified" && (
          <>
            <p>
              <strong>Name</strong>: {name.toUpperCase()}
            </p>
            <p>
              <strong>Undertaking Status</strong>: {undertaking.toUpperCase()}
            </p>
            <p style={{ color: "lightgreen" }}>{status.toUpperCase()}</p>
          </>
        )}
        {status.toLowerCase() == "invalid" && (
          <>
            <p>
              <strong>Name</strong>: {name.toUpperCase()}
            </p>
            <p>
              <strong>Undertaking Status</strong>: {undertaking.toUpperCase()}
            </p>
            <p style={{ color: "red" }}>{status.toUpperCase()}</p>
            <p>Your payment could not be processed.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ReviewBooking;
