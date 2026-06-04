import ListingCard from "../components/ListingCard/ListingCard";
import "./home.css";

export default function Home() {

  const listings = [
    {
      id: 1,
      title: "Samsung 55 Smart TV",
      price: 35000,
      image: "https://via.placeholder.com/400",
      area: "Mwiki",
      subCounty: "Kasarani",
      age: "2 days ago",
      sellerName: "Brian"
    },
    {
      id: 2,
      title: "Leather Sofa Set",
      price: 45000,
      image: "https://via.placeholder.com/400",
      area: "Utawala",
      subCounty: "Embakasi",
      age: "1 day ago",
      sellerName: "John"
    }
  ];

  return (
    <div className="home">

      <h2 className="section-title">
        Featured Listings
      </h2>

      <div className="grid">
        {listings.map((item) => (
          <ListingCard key={item.id} listing={item} />
        ))}
      </div>

    </div>
  );
}