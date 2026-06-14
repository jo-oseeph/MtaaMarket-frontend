import { useNavigate } from "react-router-dom";
import "./hero.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-inner">
        <div className="hero-content">
         

          <h1>
  Buy and Sell
  <span className="hero-accent"> Second-Hand Items Near You</span>
</h1>

<p>
  Discover affordable electronics, furniture, fashion, appliances, and more from local sellers. List your unused items in minutes and connect with buyers in your area.
</p>

<div className="hero-actions">
  <button
    className="primary-btn"
    onClick={() => navigate("/items")}
  >
    Browse Listings
  </button>

  <button
    className="secondary-btn"
    onClick={() => navigate("/create-listing")}
  >
    Sell an Item
  </button>
</div>
        </div>
      </div>
    </section>
  );
}