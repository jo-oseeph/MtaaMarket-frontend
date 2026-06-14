import {
  useEffect,
  useState,
} from "react";

import {
  getPendingListings,
  getApprovedListings,
  getRejectedListings,
  approveListing,
  rejectListing,
} from "../services/adminApi";

import "../styles/admin.css";

export default function AdminDashboard() {
  const [pending, setPending] =
    useState([]);

  const [approved, setApproved] =
    useState([]);

  const [rejected, setRejected] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadData = async () => {
    try {
      const [
        pendingData,
        approvedData,
        rejectedData,
      ] = await Promise.all([
        getPendingListings(),
        getApprovedListings(),
        getRejectedListings(),
      ]);

      setPending(pendingData);
      setApproved(approvedData);
      setRejected(rejectedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await loadData();
    };

    initializeData();
  }, []);

  const handleApprove =
    async (id) => {
      await approveListing(id);
      loadData();
    };

  const handleReject =
    async (id) => {
      await rejectListing(id);
      loadData();
    };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-dashboard">

      <h1>
        Admin Dashboard
      </h1>

      <div className="admin-stats">

        <div className="stat-card">
          <h3>Pending</h3>
          <p>{pending.length}</p>
        </div>

        <div className="stat-card">
          <h3>Approved</h3>
          <p>{approved.length}</p>
        </div>

        <div className="stat-card">
          <h3>Rejected</h3>
          <p>{rejected.length}</p>
        </div>

      </div>

      <div className="admin-table">

        <h2>
          Pending Listings
        </h2>

        {pending.length === 0 ? (
          <p>
            No pending listings.
          </p>
        ) : (
          <table>

            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {pending.map(
                (listing) => (
                  <tr
                    key={listing._id}
                  >
                    <td>
                      <img
                        src={
                          listing.images?.[0]
                        }
                        alt=""
                        width="70"
                      />
                    </td>

                    <td>
                      {
                        listing.title
                      }
                    </td>

                    <td>
                      {
                        listing.sellerName
                      }
                    </td>

                    <td>
                      KES{" "}
                      {listing.price.toLocaleString()}
                    </td>

                    <td>

                      <button
                        onClick={() =>
                          handleApprove(
                            listing._id
                          )
                        }
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleReject(
                            listing._id
                          )
                        }
                      >
                        Reject
                      </button>

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