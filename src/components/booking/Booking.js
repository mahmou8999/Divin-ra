import React, { useState, useEffect } from "react";
import "./booking.css";
import Swal from "sweetalert2";
import { isLoggedIn } from "../navbar&footer/NavBar";
import { useNavigate } from "react-router-dom";

function Booking() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");
  const [days, setDays] = useState([]);
  const [userBookings, setUserBookings] = useState([]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const today = new Date();
    const upcomingDays = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      upcomingDays.push(date);
    }
    setDays(upcomingDays);

    const storedBookings = JSON.parse(sessionStorage.getItem("bookings")) || [];
    setUserBookings(storedBookings);
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (activeTab === "transfers" && loggedInUser) {
      fetch(
        `https://694a818d26e870772065b6e7.mockapi.io/requests?userEmail=${loggedInUser.email}`
      )
        .then((res) => res.json())
        .then((serverBookings) => {
          const localBookings =
            JSON.parse(sessionStorage.getItem("bookings")) || [];

          const updated = localBookings.map((local) => {
            const match = serverBookings.find(
              (srv) => srv.date === `${local.date} at ${local.time}`
            );
            return match ? { ...local, status: match.status } : local;
          });

          setUserBookings(updated);
          sessionStorage.setItem("bookings", JSON.stringify(updated));
        })
        .catch((err) => {
          console.error("Failed to load updated booking status:", err);
        });
    }
  }, [activeTab]);

  const formatTime = (hour) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:00 ${suffix}`;
  };

  const syncNewBookingRequestToAdmin = (booking, onServerIdReceived) => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;

    const requestData = {
      userId: loggedInUser.email,
      userName: loggedInUser.name, // ✅ تعديل هنا
      userEmail: loggedInUser.email,
      date: `${booking.date} at ${booking.time}`,
      status: "Pending",
    };

    fetch("https://694a818d26e870772065b6e7.mockapi.io/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (onServerIdReceived) onServerIdReceived(data.id);
      })
      .catch((err) => {
        console.error("Failed to send booking request:", err);
      });
  };

  const handleBooking = (date, hour) => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (!isLoggedIn() || !loggedInUser) {
      Swal.fire({
        title: "Please login first",
        text: "You must be logged in to book an appointment.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, login",
        cancelButtonText: "No, thanks",
        confirmButtonColor: "#FFD700",
        cancelButtonColor: "#dc3545",
        background: "#2c2c2c",
        color: "#f0f0f0",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    const timeToBook = formatTime(hour);
    const dateToBookFormatted = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const bookingsForSelectedDay = userBookings.filter(
      (booking) => booking.date === dateToBookFormatted
    );

    if (bookingsForSelectedDay.length >= 2) {
      Swal.fire({
        icon: "error",
        title: "Booking limit reached",
        text: "You can only book 2 appointments per day.",
        confirmButtonColor: "#FFD700",
        background: "#2c2c2c",
        color: "#f0f0f0",
      });
      return;
    }

    Swal.fire({
      title: "Confirm your booking?",
      html: `Date: <strong>${dateToBookFormatted}</strong><br>Time: <strong>${timeToBook}</strong>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#FFD700",
      cancelButtonColor: "#dc3545",
      background: "#2c2c2c",
      color: "#f0f0f0",
    }).then((result) => {
      if (result.isConfirmed) {
        const newBooking = {
          id: Date.now(),
          date: dateToBookFormatted,
          time: timeToBook,
          status: "Pending",
          staff: "Admin",
          userId: loggedInUser.email,
        };

        const updatedUserBookings = [...userBookings, newBooking];
        setUserBookings(updatedUserBookings);
        sessionStorage.setItem("bookings", JSON.stringify(updatedUserBookings));

        syncNewBookingRequestToAdmin(newBooking, (serverId) => {
          const bookingsWithRealId = updatedUserBookings.map((booking) =>
            booking.id === newBooking.id
              ? { ...booking, id: serverId }
              : booking
          );
          setUserBookings(bookingsWithRealId);
          sessionStorage.setItem(
            "bookings",
            JSON.stringify(bookingsWithRealId)
          );
        });

        Swal.fire({
          title: "Booking Confirmed!",
          text: "Your appointment request has been submitted and is pending approval.",
          icon: "success",
          confirmButtonColor: "#FFD700",
          background: "#2c2c2c",
          color: "#f0f0f0",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Booking Cancelled",
          text: "Your booking was not completed.",
          confirmButtonColor: "#FFD700",
          background: "#2c2c2c",
          color: "#f0f0f0",
        });
      }
    });
  };

  return (
    <>
      <div className="toggle-bar-container mt-4">
        <div className="toggle-bar">
          <button
            className={`toggle-button ${activeTab === "new" ? "active" : ""}`}
            onClick={() => handleTabClick("new")}
          >
            + New Appointment
          </button>
          <button
            className={`toggle-button ${
              activeTab === "transfers" ? "active" : ""
            }`}
            onClick={() => handleTabClick("transfers")}
          >
            <i className="fas fa-exchange-alt"></i> My Bookings
          </button>
        </div>
      </div>

      <h1 className="m-4 text-center section-title">
        Divinéra welcomes you to the Booking Section
      </h1>

      <div className="container mb-5 text-center">
        <h3 className="mb-3">What is the Booking Section?</h3>
        <h5>
          This section allows you to book an appointment at our branch, where a
          dedicated staff member will assist you with buying or selling. If you
          are more than 15 minutes late, the appointment will be automatically
          canceled.
        </h5>
      </div>

      {activeTab === "new" && (
        <div className="container book-section-container">
          <h3 className="mb-4 section-subtitle">Book a New Appointment</h3>
          <div className="info-box opacity-75">
            <h5>Available from 12:00 PM to 12:00 AM</h5>
            <h6>All days of the week</h6>
          </div>
          <h4 className="mt-4 choose-date-title">Choose a suitable date:</h4>
          {days.map((day, i) => (
            <div key={i} className="mb-4 date-section">
              <h6 className="text-start mb-3 date-header">
                {day.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h6>
              <div className="d-flex flex-wrap gap-3 justify-content-start time-slots">
                {Array.from({ length: 12 }, (_, i) => i + 12).map((hour) => (
                  <button
                    key={hour}
                    className="btn time-slot-btn"
                    onClick={() => handleBooking(day, hour)}
                  >
                    {formatTime(hour)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "transfers" && (
        <div className="container book-section-container mt-5">
          <h3 className="mb-4 section-subtitle">My Bookings</h3>
          {userBookings.length > 0 ? (
            userBookings.map((booking) => (
              <div key={booking.id} className="booking-card p-3 mb-3 rounded">
                <p>
                  <strong>Date:</strong> {booking.date}
                </p>
                <p>
                  <strong>Time:</strong> {booking.time}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`booking-status ${booking.status.toLowerCase()}`}
                  >
                    {booking.status}
                  </span>
                </p>
                <p>
                  <strong>Staff:</strong> {booking.staff}
                </p>
              </div>
            ))
          ) : (
            <p className="no-bookings-message">No bookings found yet.</p>
          )}
        </div>
      )}
    </>
  );
}

export default Booking;
