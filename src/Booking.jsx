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

  function allFieldsFilled() {
    if (
      gender == "" ||
      name == "" ||
      email == "" ||
      roll == "" ||
      phone == "" ||
      upi == "" ||
      image == ""
    ) {
      return false;
    }
    return true;
  }

  function allFieldsValid() {
    let badFields = [];
    if (phone.length != 10) {
      badFields.push("Phone Number");
    }
    if (roll.length != 9) {
      badFields.push("Roll Number");
    }
    if (email.endsWith("@nitdelhi.ac.in") == false) {
      badFields.push("Email");
    }
    return badFields;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!allFieldsFilled()) {
      alert("Please fill all the fields");
      return;
    }

    let badFields = allFieldsValid();
    if (badFields.length > 0) {
      let fields = badFields.join(", ");
      alert(fields + " are invalid!. Please fill them again");
      return;
    }

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

    setRoll("");
    setEmail("");
    setGender("");
    setName("");
    setPhone("");
    setSelectedImage(null);
    setImage("");
    setUpi("");
  }

  function handleImageUpload(event) {
    event.preventDefault();

    if (!selectedImage) {
      alert("Please choose an image to upload");
      return;
    } else if (image != "") {
      alert("Image already uploaded.");
      return;
    }

    const paymentImages = ref(storage, `PaymentScreenshots/${v4()}`);
    uploadBytes(paymentImages, selectedImage).then((data) => {
      console.log(data, "images");
      getDownloadURL(data.ref).then((val) => {
        setImage(val);
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
          value={name}
        />
        <InputField
          id="roll"
          label="Roll Number"
          type="number"
          changeHandler={handleRollChange}
          value={roll}
        />
        <InputField
          id="phone"
          label="Phone Number (WhatsApp)"
          type="number"
          changeHandler={handlePhoneChange}
          value={phone}
        />
        <InputField
          id="email"
          label="NITD Official Email"
          type="email"
          changeHandler={handleEmailChange}
          value={email}
        />
        <RadioInput />
        <InputField
          id="imageUpload"
          label="Upload Payment Screenshot:"
          type="file"
          acceptType="image/*"
          changeHandler={handleImageChange}
          value={selectedImage}
        />
        <button
          className={`${styles.field} ${styles.upload}`}
          onClick={handleImageUpload}
        >
          Upload
        </button>
        {image != "" ? (
          <span
            style={{
              color: "lightgreen",
              fontSize: "0.75rem",
            }}
          >
            Uploaded
          </span>
        ) : (
          <span
            style={{
              color: "lightcoral",
              fontSize: "0.75rem",
            }}
          >
            Please Upload
          </span>
        )}
        <InputField
          id="upi"
          label="UPI Transaction ID"
          type="text"
          changeHandler={handleUpiChange}
          value={upi}
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
