import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaListUl,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
} from "react-icons/fa";
import { getDashboardStats } from "../services/dashboardApi";
import { getMyListings, deleteListing } from "../services/listingApi";
import "./dashboard.css";

export default function SellerDashboard() {
  const [stats, setStats] = useState({
    totalListings: 0,
    pendingListings: 0,
    approvedListings: 0,
    rejectedListings: 0,
  });
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, listingsData] = await Promise.all([
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

  const handleDelete = async (id) => {
    if (!window.confirm("Mark this item as sold and remove it?")) return;
    try {
      if (typeof deleteListing === "function") await deleteListing(id);
      setListings((prev) => prev.filter((l) => l._id !== id));
      setStats((prev) => ({
        ...prev,
        totalListings: Math.max(0, prev.totalListings - 1),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const statCards = [
    {
      label: "Total Listings",
      value: stats.totalListings,
      icon: <FaListUl />,
      color: "stat--total",
    },
    {
      label: "Pending",
      value: stats.pendingListings,
      icon: <FaClock />,
      color: "stat--pending",
    },
    {
      label: "Approved",
      value: stats.approvedListings,
      icon: <FaCheckCircle />,
      color: "stat--approved",
    },
    {
      label: "Rejected",
      value: stats.rejectedListings,
      icon: <FaTimesCircle />,
      color: "stat--rejected",
    },
  ];

  const statusClass = (status) => {
    if (status === "approved") return "badge badge--approved";
    if (status === "pending") return "badge badge--pending";
    if (status === "rejected") return "badge badge--rejected";
    return "badge";
  };

  if (loading) return <p className="dash-loading">Loading dashboard...</p>;

  return (
    <div className="dashboard">
      <div className="dash-inner">
        <div className="dash-header">
          <div>
            <p className="dash-label">SELLER DASHBOARD</p>
            <h1>My Listings</h1>
          </div>
          <Link to="/create-listing" className="create-btn">
            <FaPlus /> Create Listing
          </Link>
        </div>

        <div className="stats-grid">
          {statCards.map((s, i) => (
            <div className={`stat-card ${s.color}`} key={i}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-info">
                <p className="stat-value">{s.value}</p>
                <p className="stat-label">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="listings-section">
          <h2>All Listings</h2>

          {listings.length === 0 ? (
            <div className="empty-listings">
              <FaListUl />
              <p>No listings yet. Create your first one!</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="listings-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => (
                    <tr key={listing._id}>
                      <td className="td-title">{listing.title}</td>
                      <td className="td-price">
                        KES {listing.price?.toLocaleString()}
                      </td>
                      <td>
                        <span className={statusClass(listing.status)}>
                          {listing.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(listing._id)}
                          title="Mark as sold / delete"
                        >
                          <FaTrash /> Sold
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
