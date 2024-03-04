import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Booking from "./Booking";
import { useRef } from "react";
import Faqs from "./Faqs";
import Details from "./Details";

function App() {
  const booking = useRef(null);
  const faqs = useRef(null);
  const details = useRef(null);

  function handleBookingClick() {
    booking.current?.scrollIntoView({ behavior: "smooth" });
  }

  function handleFaqsClick() {
    faqs.current?.scrollIntoView({ behavior: "smooth" });
  }

  function handleDetailsClick() {
    details.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Navbar
        bookingScrollHandler={handleBookingClick}
        faqsScrollHandler={handleFaqsClick}
        detailsScrollHandler={handleDetailsClick}
      />

      <Banner bookingScrollHandler={handleBookingClick} />

      {/* <div ref={details}>
        <Details />
      </div> */}

      <div ref={booking}>
        <Booking />
      </div>

      <div ref={faqs}>
        <Faqs />
      </div>
    </>
  );
}

export default App;
