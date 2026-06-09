import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiMapPin } from "react-icons/fi";
import ListingCard from "../components/ListingCard/ListingCard";
import { getListings } from "../services/listingApi";
import "../styles/items.css";

export default function Items() {
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get("location") || "";

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
        item.area?.toLowerCase().includes(locationQuery.toLowerCase()) ||
        item.county?.toLowerCase().includes(locationQuery.toLowerCase());

      const matchesKeyword =
        !keyword ||
        item.title?.toLowerCase().includes(keyword.toLowerCase());

      return matchesLocation && matchesKeyword;
    });
  }, [listings, locationQuery, keyword]);

  if (loading) return <p className="items-loading">Loading listings...</p>;

  return (
    <div className="items-page">
      <div className="items-header">
        <h1>Browse Listings</h1>

        <div className="search-wrapper">
          <FiSearch />
          <input
            type="text"
            placeholder="Search items..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      {locationQuery && (
        <p className="location-info">
          <FiMapPin />
          Showing results near: <strong>{locationQuery}</strong>
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
          <div className="empty-state">
            <FiSearch />
            <p>No listings found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
}