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
        "Search approved second-hand items available near your location.",
      path: "/items",
    },
    {
      icon: <FaBoxOpen />,
      title: "List Your Item",
      description:
        "Upload 2–3 photos, add details, and submit your item for review.",
      path: "/create-listing",
    },
    {
      icon: <FaCheckCircle />,
      title: "Buy or Sell",
      description:
        "Connect with sellers directly and complete transactions safely.",
      path: "/items",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === steps.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? steps.length - 1 : prev - 1
    );
  };

  return (
    <section className="how-section">
      <div className="how-header">
        <span className="how-tag">
          HOW IT WORKS
        </span>

        <h2>
          Buy and Sell in Three
          Simple Steps
        </h2>

        <p>
          Find great second-hand deals
          or sell items you no longer
          use.
        </p>
      </div>

      {/* Desktop */}

      <div className="how-grid">
        {steps.map((step, index) => (
          <div
            key={index}
            className="how-card"
            onClick={() =>
              navigate(step.path)
            }
          >
            <div className="how-icon">
              {step.icon}
            </div>

            <span className="step-number">
              Step {index + 1}
            </span>

            <h3>{step.title}</h3>

            <p>{step.description}</p>
          </div>
        ))}
      </div>

      {/* Mobile Slider */}

      <div className="how-mobile">
        <button
          className="nav-btn"
          onClick={prevSlide}
        >
          <FaChevronLeft />
        </button>

        <div
          className="how-card mobile-card"
          onClick={() =>
            navigate(
              steps[current].path
            )
          }
        >
          <div className="how-icon">
            {steps[current].icon}
          </div>

          <span className="step-number">
            Step {current + 1}
          </span>

          <h3>
            {steps[current].title}
          </h3>

          <p>
            {
              steps[current]
                .description
            }
          </p>
        </div>

        <button
          className="nav-btn"
          onClick={nextSlide}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}