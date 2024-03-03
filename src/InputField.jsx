import React from "react";
import styles from "./Booking.module.css";

function InputField({ id, label, type, acceptType, changeHandler, value }) {
  return (
    <div className={styles.input}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {acceptType ? (
        <input
          required
          className={styles.image_field}
          type={type}
          id={id}
          accept={acceptType}
          onChange={changeHandler}
          // value={value}
        />
      ) : (
        <input
          required
          className={styles.field}
          type={type}
          id={id}
          onChange={changeHandler}
          value={value}
        />
      )}
    </div>
  );
}

export default InputField;
