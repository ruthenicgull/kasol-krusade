import React from "react";
import styles from "./Booking.module.css";
import { useState } from "react";
import InputField from "./InputField";
import { db, storage } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Booking() {
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roll, setRoll] = useState("");
  const [phone, setPhone] = useState("");
  const [upi, setUpi] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState("");

  function handleSubmit(event) {
    console.log({
      roll: roll,
      name: name,
      gender: gender,
      phone: phone,
      email: email,
      upi: upi,
      paymentScreenshot: image,
    });

    async function addBooking() {
      try {
        const docRef = await addDoc(collection(db, "bookings"), {
          roll: roll,
          name: name,
          gender: gender,
          phone: phone,
          email: email,
          upi: upi,
          paymentScreenshot: image,
        });
        alert("Booking recorded successfully!");
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        alert(error.message);
      }
    }

    addBooking();

    setEmail("");
    setGender("");
    setName("");
    setPhone("");
    setSelectedImage(null);
    setUpi("");
  }

  function handleImageUpload(event) {
    event.preventDefault();

    const paymentImages = ref(storage, `PaymentScreenshots/${v4()}`);
    uploadBytes(paymentImages, selectedImage).then((data) => {
      console.log(data, "images");
      getDownloadURL(data.ref).then((val) => {
        setImage(val);
        console.log(val);
      });
    });
  }

  function handleImageChange(event) {
    // Get the selected file from the input
    const imageFile = event.target.files[0];

    // Update the state with the selected image
    setSelectedImage(imageFile);
  }

  function handleGenderChange(event) {
    setGender(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleRollChange(event) {
    setRoll(event.target.value);
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function handleUpiChange(event) {
    setUpi(event.target.value);
  }

  function RadioInput() {
    return (
      <div className={styles.input}>
        <div className={styles.label}> Gender: {gender.toUpperCase()}</div>
        <label className={styles.label}>
          <input
            type="radio"
            value="male"
            checked={gender === "male"}
            onChange={handleGenderChange}
          />
          Male
        </label>
        <label className={styles.label}>
          <input
            type="radio"
            value="female"
            checked={gender === "female"}
            onChange={handleGenderChange}
          />
          Female
        </label>
        <label className={styles.label}>
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
        <InputField
          id="name"
          label="Full Name"
          type="text"
          changeHandler={handleNameChange}
        />
        <InputField
          id="roll"
          label="Roll Number"
          type="number"
          changeHandler={handleRollChange}
        />
        <InputField
          id="phone"
          label="Phone Number (WhatsApp)"
          type="number"
          changeHandler={handlePhoneChange}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          changeHandler={handleEmailChange}
        />
        <RadioInput />
        <InputField
          id="imageUpload"
          label="Upload Payment Screenshot:"
          type="file"
          acceptType="image/*"
          changeHandler={handleImageChange}
        />
        <button
          className={`${styles.field} ${styles.upload}`}
          onClick={handleImageUpload}
        >
          Upload
        </button>
        <InputField
          id="upi"
          label="UPI Transaction ID"
          type="text"
          changeHandler={handleUpiChange}
        />
        <button
          className={`${styles.field} ${styles.submit}`}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Booking;
