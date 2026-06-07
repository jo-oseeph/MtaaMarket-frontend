import { useNavigate } from "react-router-dom";
import "./hero.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-inner">
        <div className="hero-content">
          <span className="hero-badge">🛍️ Secondhand. Local. Trusted.</span>

          <h1>
            Give Old Things
            <span className="hero-accent"> New Homes</span>
          </h1>

          <p>
            Browse pre-loved items listed by people near you — furniture,
            electronics, clothes, and more. List what you no longer need and
            let someone else treasure it.
          </p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={() => navigate("/items")}>
              Browse Listings
            </button>
            <button className="secondary-btn" onClick={() => navigate("/create-listing")}>
              Sell an Item
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}