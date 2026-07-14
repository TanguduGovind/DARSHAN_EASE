import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";
import Loader from "../components/Loader";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings/my");
      setBookings(response.data);
    } catch (error) {
      toast.error("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirm) return;

    try {
      await api.put(`/bookings/${bookingId}/cancel`);

      toast.success("Booking Cancelled");

      fetchBookings();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to cancel booking"
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container py-5">

      <h2 className="text-center text-danger mb-4">
        My Bookings
      </h2>

      {bookings.length === 0 ? (

        <div className="alert alert-warning text-center">
          You have no bookings.
        </div>

      ) : (

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-danger">

              <tr>

                <th>Temple</th>

                <th>Date</th>

                <th>Time</th>

                <th>Persons</th>

                <th>Total Amount</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {bookings.map((booking) => (

                <tr key={booking._id}>

                  <td>

                    {booking.slot?.temple?.templeName}

                  </td>

                  <td>

                    {new Date(
                      booking.slot?.date
                    ).toLocaleDateString()}

                  </td>

                  <td>

                    {booking.slot?.startTime}

                    {" - "}

                    {booking.slot?.endTime}

                  </td>

                  <td>

                    {booking.numberOfPersons}

                  </td>

                  <td>

                    ₹ {booking.totalAmount}

                  </td>

                  <td>

                    <span
                      className={
                        booking.status === "Booked"
                          ? "badge bg-success"
                          : "badge bg-danger"
                      }
                    >
                      {booking.status}
                    </span>

                  </td>

                  <td>

                    {booking.status === "Booked" ? (

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          cancelBooking(booking._id)
                        }
                      >
                        Cancel
                      </button>

                    ) : (

                      "-"

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default MyBookings;