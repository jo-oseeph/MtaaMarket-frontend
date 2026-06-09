import { useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaUserCheck,
} from "react-icons/fa";

import "./whyChoose.css";

export default function WhyChoose() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Verified Listings",
      desc: "Every listing goes through approval before going live.",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Local Marketplace",
      desc: "Find items near your exact location instantly.",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Better Deals",
      desc: "Buy second-hand items at fair, negotiable prices.",
    },
    {
      icon: <FaUserCheck />,
      title: "Trusted Sellers",
      desc: "Real users, real profiles, real transactions.",
    },
  ];

  return (
    <section className="why-section">
      <div className="why-header">
        <h2>Why Choose MtaaMarket</h2>
        <p>
          A safer, simpler way to buy and sell second-hand items locally.
        </p>
      </div>

      <div className="why-grid">
        {features.map((item, i) => (
          <div className="why-card" key={i}>
            <div className="why-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA SECTION */}
      <div className="why-cta">
        <h3>Ready to start buying or selling?</h3>
        <p>Join thousands already trading on MtaaMarket.</p>

        <div className="why-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/items")}
          >
            Browse Items
          </button>
        </div>
      </div>
    </section>
  );
}