import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import Loader from "../components/Loader";
import SlotCard from "../components/SlotCard";

function TempleDetails() {
  const { id } = useParams();

  const [temple, setTemple] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemple();
    fetchSlots();
  }, []);

  const fetchTemple = async () => {
    try {
      const response = await api.get(`/temples/${id}`);
      setTemple(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load temple.");
    }
  };

  const fetchSlots = async () => {
    try {
      const response = await api.get(`/slots/temple/${id}`);
      setSlots(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load slots.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!temple) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Temple not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="card shadow mb-5">

        <img
          src={
            temple.image ||
            "https://via.placeholder.com/1200x400?text=Temple"
          }
          alt={temple.templeName}
          className="card-img-top"
          style={{
            height: "400px",
            objectFit: "cover",
          }}
        />

        <div className="card-body">

          <h2 className="text-danger">
            {temple.templeName}
          </h2>

          <h5 className="text-muted mb-3">
            📍 {temple.location}
          </h5>

          <p>
            {temple.description}
          </p>

        </div>

      </div>

      <h3 className="mb-4 text-danger">
        Available Slots
      </h3>

      {slots.length === 0 ? (

        <div className="alert alert-warning">
          No slots available for this temple.
        </div>

      ) : (

        slots.map((slot) => (
          <SlotCard
            key={slot._id}
            slot={slot}
          />
        ))

      )}

    </div>
  );
}

export default TempleDetails;