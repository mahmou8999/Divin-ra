import React, { useEffect, useRef, useState } from "react";
import "./Section.css";
import video from "../../img&video/Pin on amj videos.mp4";
import video2 from "../../img&video/Pin videos.mp4";
import Swipers from "../swper/Swipers";
import Gold from "../golds/Gold";

const useCountUp = (end, duration, startCounting) => {
  const [count, setCount] = useState(0);
  const requestRef = useRef();
  const startTimeRef = useRef();

  useEffect(() => {
    if (!startCounting) {
      setCount(0);
      startTimeRef.current = null;
      return;
    }

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const progress = (currentTime - startTimeRef.current) / duration;

      if (progress < 1) {
        setCount(Math.floor(progress * end));
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [end, duration, startCounting]);

  return count;
};

function Section2() {
  const facts = [
    { label: "Years of Experience", target: 25, duration: 2000 },
    { label: "Unique Designs", target: 50, duration: 1800 },
    { label: "Satisfied customers", target: 3786, duration: 3000 },
  ];

  const counterRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(counterRef.current);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
        setIsInView(false);
      }
    };
  }, [setIsInView]);

  const FactItem = ({ label, target, duration, startCounting }) => {
    const count = useCountUp(target, duration, startCounting);

    return (
      <div className="fact-item">
        <span className="fact-number text-danger">{count}</span>
        <p className="fact-label">{label}</p>
      </div>
    );
  };

  return (
    <div>
      <section className="section2 text-white mt-5">
        <h2 className="text-center mb-5">About Us</h2>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 text-center text-lg-start mb-4 mb-lg-0">
              <div className="video-sec2 w-100">
                <video
                  className="img-fluid rounded shadow-lg w-50"
                  src={video}
                  autoPlay={true}
                  muted
                  loop={true}
                ></video>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 text-center text-lg-start">
              <div className="title-sec2">
                <h2>
                  History of Div
                  <span className="text-danger">inéra</span>
                </h2>
                <p>
                  At Divinéra, we meticulously craft luxury from Earth's deepest
                  treasures. Each piece of gold and diamond jewelry is born from
                  profound passion, exceptional craftsmanship, and a sparkling
                  legacy waiting for you to tell its story. Here, we design more
                  than just jewelry; we create an inheritance that shines across
                  generations.
                </p>
                <p className="opacity-50">
                  At Divinéra, we don't just sell gold and diamonds; we offer
                  artistic pieces that embody unparalleled passion. Each design
                  is a tale of innovation, meticulously crafted to inspire your
                  soul and accompany your timeless moments. Here, jewelry
                  becomes a reflection of your unique excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section2 text-white mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 text-center text-lg-start">
              <div className="title-sec2">
                <h2 className="mb-5">
                  Why <span className="text-danger"> Choose Us?</span>
                </h2>
                <p>
                  "At Divinéra, your choice extends beyond acquiring a luxurious
                  piece; it's an investment in a legacy of authentic
                  craftsmanship, unparalleled quality, and a design that tells
                  your unique story. We promise you an everlasting sparkle and
                  service that mirrors the value of what we offer."
                </p>
                <p className="opacity-50">
                  "At Divinéra, we offer jewelry crafted with passion,
                  unparalleled quality, and a design that resonates with your
                  soul. Choose the sparkle that lasts, and the story that shines
                  with you."
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 text-center text-lg-start mb-4 mb-lg-0 ">
              <div className="video2-sec2 w-100">
                <video
                  className="img-fluid rounded shadow-lg w-50 object-fit-"
                  src={video2}
                  autoPlay={true}
                  muted
                  loop={true}
                ></video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={counterRef} className="fact-counter-section">
        <div className="container">
          <div className="row">
            {facts.map((fact, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 col-sm-6 col-12 fact-item-wrapper"
              >
                <FactItem
                  label={fact.label}
                  target={fact.target}
                  duration={fact.duration}
                  startCounting={isInView}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Gold />
    </div>
  );
}

export default Section2;
