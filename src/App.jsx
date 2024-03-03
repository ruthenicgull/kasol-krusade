import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Booking from "./Booking";
import { useRef } from "react";

function App() {
  const booking = useRef(null);
  function handleBookingClick() {
    booking.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Navbar bookingScrollHandler={handleBookingClick} />
      <Banner bookingScrollHandler={handleBookingClick} />
      <div ref={booking}>
        <Booking />
      </div>
    </>
  );
}

export default App;
