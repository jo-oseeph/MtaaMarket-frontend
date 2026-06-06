import api from "./api";

export const getPendingListings =
  async () => {
    const res = await api.get(
      "/admin/listings/pending"
    );

    return res.data;
  };

export const getApprovedListings =
  async () => {
    const res = await api.get(
      "/admin/listings/approved"
    );

    return res.data;
  };

export const getRejectedListings =
  async () => {
    const res = await api.get(
      "/admin/listings/rejected"
    );

    return res.data;
  };

export const approveListing =
  async (id) => {
    const res = await api.patch(
      `/admin/listings/${id}/approve`
    );

    return res.data;
  };

export const rejectListing =
  async (id) => {
    const res = await api.patch(
      `/admin/listings/${id}/reject`
    );

    return res.data;
  };