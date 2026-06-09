import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-col">
          <h3>MtaaMarket</h3>
          <p>
            A local second-hand marketplace where people
            buy and sell items safely and easily.
          </p>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h4>Quick Links</h4>

          <Link to="/items">Browse Items</Link>
          <Link to="/create-listing">Sell Item</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h4>Support</h4>

          <p>Help Center</p>
          <p>Safety Guidelines</p>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MtaaMarket. All rights reserved.</p>
      </div>
    </footer>
  );
}