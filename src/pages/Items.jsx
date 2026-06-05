import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ListingCard from "../components/ListingCard/ListingCard";
import { getListings } from "../services/listingApi";
import "../styles/items.css";

export default function Items() {
  const [searchParams] = useSearchParams();

  const locationQuery =
    searchParams.get("location") || "";

  const [keyword, setKeyword] = useState("");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesLocation =
        !locationQuery ||
        item.area
          ?.toLowerCase()
          .includes(locationQuery.toLowerCase()) ||
        item.county
          ?.toLowerCase()
          .includes(locationQuery.toLowerCase());

      const matchesKeyword =
        !keyword ||
        item.title
          ?.toLowerCase()
          .includes(keyword.toLowerCase());

      return matchesLocation && matchesKeyword;
    });
  }, [listings, locationQuery, keyword]);

  if (loading) return <p>Loading listings...</p>;

  return (
    <div className="items-page">
      <div className="items-header">
        <h1>Listings</h1>

        <input
          type="text"
          placeholder="Search item..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {locationQuery && (
        <p className="location-info">
          Showing results near:{" "}
          <strong>{locationQuery}</strong>
        </p>
      )}

      <div className="items-grid">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <ListingCard
              key={listing._id || listing.id}
              listing={listing}
            />
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
}