import api from "./api";

// GET all approved listings
export const getListings = async () => {
  const res = await api.get("/listings");
  return res.data;
};

// GET single listing
export const getListingById = async (id) => {
  const res = await api.get(`/listings/${id}`);
  return res.data;
};

// CREATE listing (auth required)
export const createListing = async (data) => {
  const res = await api.post("/listings", data);
  return res.data;
};