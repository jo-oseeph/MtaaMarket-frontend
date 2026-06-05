import api from "./api";

export const getListings = async () => {
  const res = await api.get("/listings");
  return res.data;
};

export const getListingById = async (id) => {
  const res = await api.get(`/listings/${id}`);
  return res.data;
};

export const createListing = async (formData) => {
  const res = await api.post(
    "/listings",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};