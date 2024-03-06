import React from "react";
import styles from "./PaymentDetails.module.css";

function PaymentDetails() {
  return (
    <div className={styles.container}>
      <div className={styles.amount}>
        Amount : <span>₹7200</span>
      </div>
      <div className={styles.payment}>
        <p>Scan and Pay Through any of the below QRs: </p>
        <div className={styles.qrs}>
          <img className={styles.qr} src="/sangrang_qr.png" alt="QRCODE" />
          <img className={styles.qr} src="/sangrang_qr.png" alt="QRCODE" />
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
