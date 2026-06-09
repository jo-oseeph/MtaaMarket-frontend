import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBoxOpen,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import "./howItWorks.css";

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <FaSearch />,
      title: "Browse Listings",
      description:
        "Search verified second-hand items near your location.",
      path: "/items",
    },
    {
      icon: <FaBoxOpen />,
      title: "List Your Item",
      description:
        "Upload 2–3 images and publish your item for approval.",
      path: "/create-listing",
    },
    {
      icon: <FaCheckCircle />,
      title: "Buy & Sell Safely",
      description:
        "Connect directly with sellers and complete deals.",
      path: "/items",
    },
  ];

  const [current, setCurrent] = useState(0);
  const total = steps.length;

  const next = () => setCurrent((p) => (p + 1) % total);
  const prev = () => setCurrent((p) => (p - 1 + total) % total);

  // swipe support
  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) next(); // swipe left
    if (diff < -50) prev(); // swipe right
  };

  return (
    <section className="how-section">
      <div className="how-header">
        <span className="how-tag">HOW IT WORKS</span>

        <h2>Simple Steps to Start Trading</h2>

        <p>
          A clean process to buy or sell second-hand items
          in your area.
        </p>
      </div>

      {/* DESKTOP */}
      <div className="how-grid">
        {steps.map((step, i) => (
          <div
            key={i}
            className="how-card"
            onClick={() => navigate(step.path)}
          >
            <div className="how-icon">{step.icon}</div>

            <span className="step-number">Step {i + 1}</span>

            <h3>{step.title}</h3>

            <p>{step.description}</p>
          </div>
        ))}
      </div>

      {/* MOBILE SWIPE */}
      <div
        className="how-mobile"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className="nav-btn" onClick={prev}>
          <FaChevronLeft />
        </button>

        <div
          className="how-card mobile-card"
          onClick={() => navigate(steps[current].path)}
        >
          <div className="how-icon">{steps[current].icon}</div>

          <span className="step-number">
            Step {current + 1}
          </span>

          <h3>{steps[current].title}</h3>

          <p>{steps[current].description}</p>
        </div>

        <button className="nav-btn" onClick={next}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}