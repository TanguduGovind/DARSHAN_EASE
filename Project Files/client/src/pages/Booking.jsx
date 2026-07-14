import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";

function Booking() {
  const { slotId } = useParams();
  const navigate = useNavigate();

  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (numberOfPersons < 1) {
      toast.error("Number of persons must be at least 1");
      return;
    }

    try {
      setLoading(true);

      await api.post("/bookings", {
        slotId,
        numberOfPersons: Number(numberOfPersons),
      });

      toast.success("Booking Successful");

      navigate("/my-bookings");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Booking Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="text-center text-danger mb-4">
                Book Darshan Slot
              </h2>

              <form onSubmit={handleBooking}>

                <div className="mb-4">

                  <label className="form-label">
                    Number of Persons
                  </label>

                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    value={numberOfPersons}
                    onChange={(e) =>
                      setNumberOfPersons(e.target.value)
                    }
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-danger w-100"
                  disabled={loading}
                >
                  {loading
                    ? "Booking..."
                    : "Confirm Booking"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Booking;