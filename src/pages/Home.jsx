import ListingCard from "../components/ListingCard/ListingCard";
import "./home.css";

export default function Home() {
  const listings = [
    {
      id: 1,
      title: "Samsung 55 Inch Smart TV",
      price: 35000,
      county: "Nairobi",
      area: "Mwiki",
      sellerName: "Brian",
      age: "2 days ago",

      images: [
        "https://images.unsplash.com/photo-1593784991095-a205069470b6",
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
      ],
    },
    {
      id: 2,
      title: "Leather Sofa Set",
      price: 45000,
      county: "Nairobi",
      area: "Utawala",
      sellerName: "John",
      age: "1 day ago",

      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f",
      ],
    },
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