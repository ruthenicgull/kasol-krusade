import React from "react";
import styles from "./PaymentDetails.module.css";

function PaymentDetails() {
  return (
    <div className={styles.container}>
      <div className={styles.amount}>
        Amount : <span>₹7200</span>
      </div>
      <div>
        <p>Scan and Pay Through: </p>
        <img className={styles.qr} src="/sample_qr.png" alt="QRCODE" />
      </div>
    </div>
  );
}

export default PaymentDetails;
