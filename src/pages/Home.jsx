import ListingCard from "../components/ListingCard/ListingCard";
import listings from "../data/listings";
import "./home.css";

export default function Home() {
  return (
    <div className="home">

      <h2 className="section-title">
        Featured Listings
      </h2>

      <div className="grid">
        {listings.slice(0, 3).map((item) => (
          <ListingCard
            key={item.id}
            listing={item}
          />
        ))}
      </div>

    </div>
  );
}