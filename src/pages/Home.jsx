import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!location.trim()) return;

    navigate(`/items?location=${encodeURIComponent(location)}`);
  };

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <h1>Find anything around you, instantly</h1>
        <p>Search by location and discover nearby listings on MtaaMarket</p>

        <form onSubmit={handleSearch} className="hero-search">
          <input
            type="text"
            placeholder="Enter location (e.g Nairobi, Kilimani)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section>

      {/* FEATURED */}
      <section className="section">
        <h2>Featured Listings</h2>

        <div className="grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="card">
              <div className="img"></div>
              <h3>Sample Item {item}</h3>
              <p>Ksh 2,000</p>
              <span>Nairobi</span>
            </div>
          ))}
        </div>
      </section>

      {/* BROWSE */}
      <section className="section">
        <h2>Browse Listings</h2>

        <div className="grid">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="card">
              <div className="img"></div>
              <h3>Item {item}</h3>
              <p>Ksh 1,500</p>
            </div>
          ))}
        </div>

        <button
          className="more-btn"
          onClick={() => navigate("/items")}
        >
          View More
        </button>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <h2>How It Works</h2>

        <div className="steps">
          <div>1. Search by location</div>
          <div>2. View nearby listings</div>
          <div>3. Contact seller directly</div>
        </div>
      </section>

    </div>
  );
}