import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Seller Dashboard</h1>

      <p>
        Welcome back,
        {" "}
        {user?.fullname}
      </p>

      <div>
        <h3>Quick Actions</h3>

        <ul>
          <li>Create Listing</li>
          <li>My Listings</li>
          <li>Favorites</li>
          <li>Messages</li>
        </ul>
      </div>
    </div>
  );
}