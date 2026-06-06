import { useNavigate } from "react-router-dom";
import "./hero.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">

      <div className="hero-overlay" />

      <div className="hero-content">

        <h1>
          Buy & Sell Anything Around You
        </h1>

        <p>
          Discover second-hand deals in your area or list items you no longer need.
          Fast, local, and trusted.
        </p>

        <div className="hero-actions">

          <button
            className="primary-btn"
            onClick={() => navigate("/items")}
          >
            Discover Items
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/create-listing")}
          >
            Sell Item
          </button>

        </div>

      </div>

    </section>
  );
}