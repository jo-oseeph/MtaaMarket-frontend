import { useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaUserCheck,
  FaArrowRight,
} from "react-icons/fa";
import "./WhyChoose.css";

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
      <div className="why-inner">

        <div className="why-header">
          <span className="why-tag">WHY MTAAMARKET</span>
          <h2>Built for Trust. Built for You.</h2>
          <p>A safer, simpler way to buy and sell second-hand items locally.</p>
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

        <div className="why-cta">
          <div className="cta-glow" />
          <div className="cta-content">
            <span className="cta-tag">GET STARTED TODAY</span>
            <h3>Ready to Start Buying or Selling?</h3>
            <p>Join thousands already trading on MtaaMarket across Kenya.</p>
            <div className="why-actions">
              <button className="cta-primary" onClick={() => navigate("/register")}>
                Create Free Account <FaArrowRight />
              </button>
              <button className="cta-secondary" onClick={() => navigate("/items")}>
                Browse Items
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}