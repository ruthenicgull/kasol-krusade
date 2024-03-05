import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styles from "./Booking.module.css";
import { useState } from "react";
import InputField from "./InputField";
import { db, storage } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function Booking() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roll, setRoll] = useState("");
  const [phone, setPhone] = useState("");
  const [upi, setUpi] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState("");
  const [booked, setBooked] = useState(false);

  const [refId, setRefId] = useState("");

  const [value, setValue] = React.useState("1");

  const tabStyle = {
    color: "white",
    fontFamily: `"Poppins", sans-serif`,
    fontSize: "0.8rem",
  };
  const panelStyle = {
    color: "white",
    fontFamily: `"Poppins", sans-serif`,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function allFieldsFilled() {
    if (
      age == "" ||
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
    if (!(age >= 18 && age <= 60)) {
      badFields.push("Age");
    }
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
      let alertString = "";
      for (let i = 0; i < badFields.length; i++) {
        if (badFields[i] == "Phone Number" || badFields[i] == "Roll Number") {
          alertString += `${badFields[i]} is invalid.\n`;
        }
        if (badFields[i] == "Age") {
          alertString += `Age is invalid. \nNote: Minimum age is 18.`;
        }
        if (badFields[i] == "Email") {
          alertString += "Email address is invalid.\n";
        }
      }
      alertString += "Please fill all the fields correctly!";
      alert(alertString);
      return;
    }

    setRefId(`${roll}${upi}`);

    async function addBooking() {
      try {
        const docRef = await addDoc(collection(db, "bookings"), {
          roll: roll,
          name: name,
          age: age,
          gender: gender,
          phone: phone,
          email: email,
          upi: upi,
          refId: `${roll}${upi}`,
          paymentScreenshot: image,
        });
        alert("Booking recorded successfully!");
        setBooked(true);
        // console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        alert(error.message);
      }
    }

    addBooking();

    setAge("");
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

  function handleAgeChange(event) {
    setAge(event.target.value);
  }

  function handleBookAgain() {
    setBooked(false);
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
      <h2 className={styles.form_header}>Booking</h2>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          marginTop: "1rem",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              borderRadius: "0.5rem",
              width: "fit-content",
              margin: "0 auto",
              padding: "0 0.5rem",
            }}
          >
            <TabList
              onChange={handleChange}
              // aria-label="lab API tabs example"
              variant="fullWidth"
              // orientation="horizontal"
              // allowScrollButtonsMobile={true}
            >
              <Tab label="Make Booking" value="1" sx={tabStyle} />
              <Tab label="Review Booking" value="2" sx={tabStyle} />
            </TabList>
          </Box>
          <TabPanel value="1" sx={panelStyle}>
            {!booked && (
              <>
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
                    id="roll"
                    label="Age"
                    type="number"
                    changeHandler={handleAgeChange}
                    value={age}
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
                  {image != "" && (
                    <span
                      style={{
                        color: "lightgreen",
                        fontSize: "0.75rem",
                      }}
                    >
                      Uploaded
                    </span>
                  )}
                  {image == "" && (
                    <span
                      style={{
                        color: "lightyellow",
                        fontSize: "0.75rem",
                      }}
                    >
                      Uploading might take a second.
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
              </>
            )}
            {booked && (
              <>
                <h2 className={styles.booked_header}>
                  Congrats, you have successfully recorded your booking!
                </h2>
                <div className={styles.booked_content}>
                  <p>This is your unique reference id:</p>
                  <div className={styles.refId}>
                    <h3 className={styles.refIdNo}>{refId}</h3>
                    <CopyToClipboard text={refId}>
                      <button className={styles.copy_icon}>
                        <ContentCopyIcon />
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
                <button
                  className={styles.book_again_button}
                  onClick={handleBookAgain}
                >
                  Back To Booking
                </button>
              </>
            )}
          </TabPanel>
          <TabPanel value="2" sx={panelStyle}>
            Coming Soon...
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default Booking;
