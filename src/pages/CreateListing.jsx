import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createListing } from "../services/listingApi";
import "./CreateListing.css";

export default function CreateListing() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    county: "",
    area: "",
    phoneNumber: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      setError("Maximum 3 images allowed");
      return;
    }

    setError("");
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 1) {
      setError("Minimum 1 image required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      images.forEach((image) => {
        formData.append("images", image);
      });

      const listing = await createListing(formData);

      navigate(`/listing/${listing._id}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-listing">
      <form className="listing-form" onSubmit={handleSubmit}>
        <h1>Create Listing</h1>

        {error && <p className="error">{error}</p>}

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          name="county"
          placeholder="County"
          value={form.county}
          onChange={handleChange}
          required
        />

        <input
          name="area"
          placeholder="Area"
          value={form.area}
          onChange={handleChange}
          required
        />

        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImages}
          required
        />

        <p>Upload 2–3 images</p>

        {images.length > 0 && (
          <div className="preview-grid">
            {images.map((image, index) => (
              <img key={index} src={URL.createObjectURL(image)} alt="" />
            ))}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Submit Listing"}
        </button>
      </form>
    </div>
  );
}
