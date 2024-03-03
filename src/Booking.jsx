import React from "react";
import styles from "./Booking.module.css";
import { useState } from "react";

function Booking() {
  const [gender, setGender] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const submitClickHandler = (event) => {
    event.preventDefault();
  };

  const handleImageChange = (event) => {
    // Get the selected file from the input
    const imageFile = event.target.files[0];

    // Update the state with the selected image
    setSelectedImage(imageFile);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  function InputField({ id, label, type, acceptType }) {
    return (
      <div className={styles.input}>
        <label htmlFor={id}>{label}</label>
        {acceptType ? (
          <input
            className={styles.image_field}
            type={type}
            id={id}
            accept={acceptType}
          />
        ) : (
          <input className={styles.field} type={type} id={id} />
        )}
      </div>
    );
  }

  function RadioInput() {
    return (
      <div className={styles.input}>
        <div> Gender: {gender.toUpperCase()}</div>
        <label>
          <input
            type="radio"
            value="male"
            checked={gender === "male"}
            onChange={handleGenderChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="female"
            checked={gender === "female"}
            onChange={handleGenderChange}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            value="other"
            checked={gender === "other"}
            onChange={handleGenderChange}
          />
          Other
        </label>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.form_header}>ENTER YOUR DETAILS HERE</h2>
      <form className={styles.form_container}>
        <InputField id="name" label="Full Name" type="text" />
        <InputField id="roll" label="Roll Number" type="number" />
        <InputField id="phone" label="Phone Number (WhatsApp)" type="number" />
        <InputField id="email" label="Email" type="email" />
        <RadioInput />
        <InputField
          id="imageUpload"
          label="Upload Payment Screenshot:"
          type="file"
          acceptType="image/*"
        />
        <InputField id="upi" label="UPI Transaction ID" type="text" />
        <button
          className={`${styles.field} ${styles.submit}`}
          onClick={submitClickHandler}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Booking;
