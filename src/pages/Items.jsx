import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import listings from "../data/listings";
import ListingCard from "../components/ListingCard/ListingCard";
import "../styles/items.css";

export default function Items() {
  const [searchParams] = useSearchParams();

  const locationQuery =
    searchParams.get("location") || "";

  const [keyword, setKeyword] =
    useState("");

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesLocation =
        !locationQuery ||
        item.location
          .toLowerCase()
          .includes(
            locationQuery.toLowerCase()
          );

      const matchesKeyword =
        !keyword ||
        item.title
          .toLowerCase()
          .includes(
            keyword.toLowerCase()
          );

      return (
        matchesLocation &&
        matchesKeyword
      );
    });
  }, [locationQuery, keyword]);

  return (
    <div className="items-page">
      <div className="items-header">
        <h1>Listings</h1>

        <input
          type="text"
          placeholder="Search item..."
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
        />
      </div>

      {locationQuery && (
        <p className="location-info">
          Showing results near:
          {" "}
          <strong>
            {locationQuery}
          </strong>
        </p>
      )}

     <div className="items-grid">
  {filteredListings.length > 0 ? (
    filteredListings.map((listing) => (
      <ListingCard key={listing.id} listing={listing} />
    ))
  ) : (
    <p>No listings found.</p>
  )}
</div>
    </div>
  );
}