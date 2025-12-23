import React, { useEffect, useState } from "react";
import "./Section.css";
import img1 from "../../img&video/download.jpg";
import img2 from "../../img&video/img2.jpg";
import img3 from "../../img&video/img3.jpg";
import img4 from "../../img&video/img4.jpg";
import video1 from "../../img&video/Jewelry.mp4";
import video2 from "../../img&video/video2.mp4";
import Section2 from "./Section2";

function Section1() {
  const [states, setStates] = useState({
    showBox1: false,
    showBox2: false,
    showBox3: false,
    showBox1m: false,
    showVideo2: false,
    showVideo2All: false,
    showDelete: false,
    showCard: false,
    descent: false,
    deleted: false,
    sec2: false,
  });

  const setStateAfterDelay = (key, delay) => {
    setTimeout(() => {
      setStates((prev) => ({ ...prev, [key]: true }));
    }, delay);
  };

  useEffect(() => {
    const timers = [
      ["sec2", 1500],
      ["showBox1", 2000],
      ["showBox2", 2300],
      ["showBox3", 2600],
      ["showBox1m", 4500],
      ["showVideo2", 4500],
      ["showVideo2All", 5500],
      ["showDelete", 7000],
      ["showCard", 8500],
      ["descent", 10000],
      ["deleted", 12000],
    ];

    timers.forEach(([key, delay]) => setStateAfterDelay(key, delay));
  }, []);

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <section className="hero-section ">
          <div className="overlay">
            <div className="imgs ms-lg-5">
              <div
                className={`media-box1  box1 ${states.showBox1 ? "show" : ""} 
              ${states.showVideo2All ? "delete" : ""}
              ${states.showDelete ? "deletee" : ""}
              `}
              >
                <img
                  className={`media1  ${states.showBox1m ? "img1m" : ""} mb-3`}
                  src={img1}
                  alt=""
                />
                <div className="notification">
                  <div className="notiglow"></div>
                  <div className="notiborderglow"></div>
                  <div className="notititle">
                    <h3>Welcome To Divinéra</h3>
                  </div>
                  <div className="notibody">
                    <h5>We design every piece with love and intention.</h5>
                  </div>
                </div>
              </div>

              <div
                className={`media-box2 box1 ${states.showBox2 ? "show" : ""}
                          ${states.showVideo2All ? "delete" : ""}
              ${states.showDelete ? "deletee" : ""}`}
              >
                <img className="media2" src={img2} alt="" />
              </div>
              <div className="media-box">
                <div
                  className={`media-box4  video2 ${
                    states.showBox1m ? "media-box4m" : ""
                  } mb-1
                ${states.showDelete ? "allw" : ""}
                ${states.descent ? "descentBigBox" : ""}
                        ${states.deleted ? "descentW" : ""}
                  `}
                >
                  {states.showVideo2 && (
                    <video src={video2} autoPlay muted loop></video>
                  )}
                </div>
                <div
                  className={`media-box3 box1  ${
                    states.showBox1m ? "media-box3m " : ""
                  } ${states.showBox3 ? "show" : ""}
                } ${states.deleted ? "deletee" : ""}
                `}
                >
                  <video className="media3" src={video1} autoPlay muted loop />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`carrd  ${states.showCard ? "show-box" : ""}
        ${states.descent ? "descent" : ""}
        ${states.deleted ? "deletee" : ""}
        `}
          >
            <div className="carrd-content">
              <p className="carrd-title">Crafted with Purpose</p>
              <p className="carrd-para">
                Each Piece iS meticulously hardcratted by master artisans using
                tirne-h•onored techniques. From hand-selected gemstones, every
                element refkcts our cornrnitment to quality and ebegance.
              </p>
            </div>
          </div>
          <div
            className={`media-box5 box5 ${states.showDelete ? "show-box" : ""}
        ${states.descent ? "descentCardTwo" : ""} 
        ${states.deleted ? "deletee" : ""} `}
          >
            <img className="media2" src={img3} alt="" />
          </div>
        </section>

        <section className={`team-section  ${states.deleted ? "d-block" : ""}`}>
          <div className="team-container text-center">
            <div
              className={`team-image ${states.deleted ? "animate-drop" : ""}`}
            >
              <img src={img4} alt="Team" />
            </div>
            <div className="team-text mt-4">
              <p>
                United by creativity, precision, and purpose, we collaborate at
                every stage to ensure each piece meets the highest standards.
                More than a team — we are a family of creators devoted to
                timeless beauty and meaningful design.
              </p>
            </div>
          </div>
        </section>
      </div>
      <section
        className={` text-white px-4 transition-section ${
          states.sec2 ? "section-visible" : ""
        }`}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap gap-4">
          <h2 className="fw-bold fs-3">Divinéra</h2>

          <div className="flex-grow-1 " style={{ maxWidth: "500px" }}>
            <p className="mb-1">
              Divinéra crafts modern, timeless jewelry that elevates everyday
            </p>
            <p className="mb-0">
              Each piece reflects refined style and conscious design.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-light rounded-pill px-4 py-2 fw-semibold">
              Explore more
            </button>
            <button
              className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px" }}
            >
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>
      <Section2 />
    </div>
  );
}

export default Section1;
