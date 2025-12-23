import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeSection, setActiveSection] = useState("Dashboard");

  useEffect(() => {
    const allSideMenu = document.querySelectorAll(
      "#sidebar .side-menu.top li a"
    );

    allSideMenu.forEach((item) => {
      const li = item.parentElement;
      item.addEventListener("click", function () {
        allSideMenu.forEach((i) => {
          i.parentElement.classList.remove("active");
        });
        li.classList.add("active");
      });
    });

    const sidebar = document.getElementById("sidebar");
    const menuBar = document.querySelector("#content nav .bx.bx-menu");

    const adjustSidebar = () => {
      if (window.innerWidth <= 576) {
        sidebar.classList.add("hide");
        sidebar.classList.remove("show");
      } else {
        sidebar.classList.remove("hide");
        sidebar.classList.add("show");
      }
    };

    if (menuBar) {
      menuBar.addEventListener("click", () => {
        sidebar.classList.toggle("hide");
      });
    }

    adjustSidebar();
    window.addEventListener("resize", adjustSidebar);

    fetch("https://694a818d26e870772065b6e7.mockapi.io/requests")
      .then((res) => res.json())
      .then((data) => setRequests(data));

    fetch("https://694a800a26e870772065b030.mockapi.io/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    return () => {
      window.removeEventListener("resize", adjustSidebar);
    };
  }, []);

  const handleDecision = (reqId, userEmail, status) => {
    fetch(`https://694a818d26e870772065b6e7.mockapi.io/requests/${reqId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then(() => {
        setRequests((prevRequests) =>
          prevRequests.filter((r) => r.id !== reqId)
        );

        const bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];

        const updatedBookings = bookings.map((booking) =>
          booking.id === reqId ? { ...booking, status: status } : booking
        );

        sessionStorage.setItem("bookings", JSON.stringify(updatedBookings));
        sessionStorage.setItem("refreshBookings", "true");
      });
  };

  const handleDeleteUser = (id) => {
    fetch(`https://694a800a26e870772065b030.mockapi.io/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    });
  };

  const loggedInAdmin =
    JSON.parse(sessionStorage.getItem("loggedInUser")) || [];

  return (
    <div>
      <section id="sidebar">
        <Link to="#" className="brand">
          <i className="bx bxs-smile bx-lg"></i>
          <span className="text">Admin {loggedInAdmin.name}</span>
        </Link>
        <ul className="side-menu top">
          <li className={activeSection === "Dashboard" ? "active" : ""}>
            <Link to="#" onClick={() => setActiveSection("Dashboard")}>
              <i className="bx bxs-dashboard bx-sm"></i>
              <span className="text">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/home">
              <i className="bx bxs-shopping-bag-alt bx-sm"></i>
              <span className="text">My Store</span>
            </Link>
          </li>
          <li className={activeSection === "Analytics" ? "active" : ""}>
            <Link to="#" onClick={() => setActiveSection("Analytics")}>
              <i className="bx bxs-doughnut-chart bx-sm"></i>
              <span className="text">Analytics</span>
            </Link>
          </li>
          <li className={activeSection === "Messages" ? "active" : ""}>
            <Link to="#" onClick={() => setActiveSection("Messages")}>
              <i className="bx bxs-message-dots bx-sm"></i>
              <span className="text">Users</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="bx bxs-group bx-sm"></i>
              <span className="text">Team</span>
            </Link>
          </li>
        </ul>
        <ul className="side-menu bottom">
          <li>
            <Link to="#">
              <i className="bx bxs-cog bx-sm bx-spin-hover"></i>
              <span className="text">Settings</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="logout">
              <i className="bx bx-power-off bx-sm bx-burst-hover"></i>
              <span className="text">Logout</span>
            </Link>
          </li>
        </ul>
      </section>

      <section id="content">
        <nav>
          <i className="bx bx-menu bx-sm"></i>
          <Link to="#" className="nav-link" id="categoriesLink">
            Categories
          </Link>
        </nav>

        <main>
          {activeSection === "Dashboard" && (
            <>
              <div className="head-title">
                <div className="left">
                  <h1>Dashboard</h1>
                  <ul className="breadcrumb">
                    <li>
                      <Link to="#">Dashboard</Link>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>
                    </li>
                    <li>
                      <Link className="active" to="#">
                        Home
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <ul className="box-info">
                <li>
                  <i className="bx bxs-calendar-check"></i>
                  <span className="text">
                    <h3>
                      {requests.filter((r) => r.status === "Pending").length}
                    </h3>
                    <p>New Requests</p>
                  </span>
                </li>
                <li>
                  <i className="bx bxs-group"></i>
                  <span className="text">
                    <h3>2834</h3>
                    <p>Visitors</p>
                  </span>
                </li>
                <li>
                  <i className="bx bxs-dollar-circle"></i>
                  <span className="text">
                    <h3>2543.00 N$</h3>
                    <p>Total Sales</p>
                  </span>
                </li>
              </ul>

              <div className="table-data">
                <div className="order">
                  <div className="head">
                    <h3>Recent Orders</h3>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Date and Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.filter((r) => r.status === "Pending").length ===
                      0 ? (
                        <tr>
                          <td
                            colSpan="3"
                            style={{ textAlign: "center", padding: "20px" }}
                          >
                            No new requests
                          </td>
                        </tr>
                      ) : (
                        requests
                          .filter((r) => r.status === "Pending")
                          .map((req) => (
                            <tr key={req.id}>
                              <td>
                                <span>{req.userName}</span>
                                <p>{req.userEmail}</p>
                              </td>
                              <td>{req.date}</td>
                              <td>
                                <button
                                  className="btn btn-sm btn-success me-2"
                                  onClick={() =>
                                    handleDecision(
                                      req.id,
                                      req.userEmail,
                                      "Accepted"
                                    )
                                  }
                                >
                                  Accept
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() =>
                                    handleDecision(
                                      req.id,
                                      req.userEmail,
                                      "Rejected"
                                    )
                                  }
                                >
                                  Reject
                                </button>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeSection === "Analytics" && (
            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3>All Booking Requests</h3>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Date and Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length === 0 ? (
                      <tr>
                        <td
                          colSpan="3"
                          style={{ textAlign: "center", padding: "20px" }}
                        >
                          No booking requests found.
                        </td>
                      </tr>
                    ) : (
                      requests.map((req) => (
                        <tr key={req.id}>
                          <td>
                            <span>{req.userName}</span>
                            <p>{req.userEmail}</p>
                          </td>
                          <td>{req.date}</td>
                          <td>
                            <span
                              className={`badge ${
                                req.status === "Accepted"
                                  ? "bg-success"
                                  : req.status === "Rejected"
                                  ? "bg-danger"
                                  : "bg-warning text-dark"
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "Messages" && (
            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3>All Users</h3>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td
                          colSpan="3"
                          style={{ textAlign: "center", padding: "20px" }}
                        >
                          No users found.
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </section>
    </div>
  );
}

export default AdminDashboard;
