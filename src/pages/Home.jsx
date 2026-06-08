import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard/ListingCard";
import { getListings } from "../services/listingApi";
import SecondHandHero from "../components/Hero";
import "./home.css";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <SecondHandHero />

      <div className="home">
        <div className="section-header">
          <h2 className="section-title">Featured Listings</h2>
          <Link to="/items" className="section-link">View all →</Link>
        </div>

        <div className="grid">
          {listings.slice(0, 4).map((item) => (
            <ListingCard
              key={item._id || item.id}
              listing={item}
            />
          ))}
        </div>
      </div>
    </>
  );
}