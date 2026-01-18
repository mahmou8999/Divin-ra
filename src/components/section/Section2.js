import React, { useEffect, useRef, useState } from "react";
import "./Section.css";
import video from "../../img&video/Pin on amj videos.mp4";
import video2 from "../../img&video/Pin videos.mp4";
import Gold from "../golds/Gold";

const useCountUp = (end, duration, startCounting) => {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    if (!startCounting) {
      setCount(0);
      startTimeRef.current = null;
      return;
    }

    const animate = (time) => {
      if (!startTimeRef.current) {
        startTimeRef.current = time;
      }

      const progress = Math.min(
        (time - startTimeRef.current) / duration,
        1
      );

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [startCounting, end, duration]);

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
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const FactItem = ({ label, target, duration }) => {
    const count = useCountUp(target, duration, isInView);

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
            <div className="col-lg-6 col-md-12 text-center mb-4 mb-lg-0">
              <video
                className="img-fluid rounded shadow-lg w-50"
                src={video}
                autoPlay
                muted
                loop
              />
            </div>

            <div className="col-lg-6 col-md-12">
              <h2>
                History of Div
                <span className="text-danger">inéra</span>
              </h2>
              <p>
                At Divinéra, we meticulously craft luxury from Earth's deepest
                treasures. Each piece of gold and diamond jewelry is born from
                passion, craftsmanship, and legacy.
              </p>
              <p className="opacity-50">
                We create more than jewelry — we create stories that shine across
                generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section2 text-white mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
              <h2 className="mb-5">
                Why <span className="text-danger">Choose Us?</span>
              </h2>
              <p>
                Choosing Divinéra means investing in timeless elegance, premium
                craftsmanship, and a story crafted just for you.
              </p>
              <p className="opacity-50">
                We promise a sparkle that lasts a lifetime.
              </p>
            </div>

            <div className="col-lg-6 col-md-12 text-center">
              <video
                className="img-fluid rounded shadow-lg w-50"
                src={video2}
                autoPlay
                muted
                loop
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={counterRef} className="fact-counter-section">
        <div className="container">
          <div className="row justify-content-center">
            {facts.map((fact, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-4 col-sm-6 col-12"
              >
                <FactItem {...fact} />
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
