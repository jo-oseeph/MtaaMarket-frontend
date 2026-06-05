import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { getDashboardStats } from "../services/dashboardApi";
import { getMyListings } from "../services/listingApi";


export default function SellerDashboard() {
  const [stats, setStats] = useState({
  totalListings: 0,
  pendingListings: 0,
  approvedListings: 0,
  rejectedListings: 0,
});

  const [listings, setListings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchData =
      async () => {
        try {
          const [
            statsData,
            listingsData,
          ] = await Promise.all([
            getDashboardStats(),
            getMyListings(),
          ]);

          setStats(statsData);
          setListings(listingsData);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchData();
  }, []);

  if (loading) {
    return (
      <p>Loading dashboard...</p>
    );
  }

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>
          Seller Dashboard
        </h1>

        <Link
          to="/create-listing"
          className="create-btn"
        >
          Create Listing
        </Link>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total</h3>
          <p>
            {stats.totalListings}
          </p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>
            {stats.pendingListings}
          </p>
        </div>

        <div className="stat-card">
          <h3>Approved</h3>
          <p>
            {stats.approvedListings}
          </p>
        </div>

        <div className="stat-card">
          <h3>Rejected</h3>
          <p>
            {stats.rejectedListings}
          </p>
        </div>

      </div>

      <div className="my-listings">

        <h2>
          My Listings
        </h2>

        {listings.length === 0 ? (
          <p>
            No listings found.
          </p>
        ) : (
          <table>

            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {listings.map(
                (listing) => (
                  <tr
                    key={listing._id}
                  >
                    <td>
                      {
                        listing.title
                      }
                    </td>

                    <td>
                      KES{" "}
                      {listing.price.toLocaleString()}
                    </td>

                    <td>
                      {
                        listing.status
                      }
                    </td>
                  </tr>
                )
              )}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}