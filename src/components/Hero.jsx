import "./hero.css";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="hero">

      <h1 className="hero-title">
        Find Second-Hand Items Near You
      </h1>

      <p className="hero-subtitle">
        Search by item, location or category
      </p>

      <div className="hero-search">

        <div className="input-group">
          <FaSearch className="icon" />
          <input type="text" placeholder="What are you looking for?" />
        </div>

        <div className="input-group">
          <FaMapMarkerAlt className="icon" />
          <input type="text" placeholder="Location (e.g Kasarani)" />
        </div>

        <button>
          Search
        </button>

      </div>

    </div>
  );
}