import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";
import Loader from "../components/Loader";

function Admin() {
  const [loading, setLoading] = useState(true);

  const [temples, setTemples] = useState([]);
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [templeForm, setTempleForm] = useState({
    templeName: "",
    location: "",
    description: "",
    image: "",
  });

  const [slotForm, setSlotForm] = useState({
    temple: "",
    date: "",
    startTime: "",
    endTime: "",
    availableSeats: "",
    price: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const templesRes = await api.get("/temples");
      const slotsRes = await api.get("/slots");
      const bookingsRes = await api.get("/bookings");

      setTemples(templesRes.data);
      setSlots(slotsRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      toast.error("Unable to load data.");
    } finally {
      setLoading(false);
    }
  };

  const handleTempleChange = (e) => {
    setTempleForm({
      ...templeForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSlotChange = (e) => {
    setSlotForm({
      ...slotForm,
      [e.target.name]: e.target.value,
    });
  };

  const addTemple = async (e) => {
    e.preventDefault();

    try {
      await api.post("/temples", templeForm);

      toast.success("Temple Added");

      setTempleForm({
        templeName: "",
        location: "",
        description: "",
        image: "",
      });

      fetchData();
    } catch (error) {
      toast.error("Unable to add temple");
    }
  };

  const addSlot = async (e) => {
    e.preventDefault();

    try {
      await api.post("/slots", {
        ...slotForm,
        availableSeats: Number(slotForm.availableSeats),
        price: Number(slotForm.price),
      });

      toast.success("Slot Added");

      setSlotForm({
        temple: "",
        date: "",
        startTime: "",
        endTime: "",
        availableSeats: "",
        price: "",
      });

      fetchData();
    } catch (error) {
      toast.error("Unable to add slot");
    }
  };

  const deleteTemple = async (id) => {
    if (!window.confirm("Delete this temple?")) return;

    try {
      await api.delete(`/temples/${id}`);

      toast.success("Temple Deleted");

      fetchData();
    } catch (error) {
      toast.error("Unable to delete temple");
    }
  };

  const deleteSlot = async (id) => {
    if (!window.confirm("Delete this slot?")) return;

    try {
      await api.delete(`/slots/${id}`);

      toast.success("Slot Deleted");

      fetchData();
    } catch (error) {
      toast.error("Unable to delete slot");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container py-5">

      <h1 className="text-center text-danger mb-5">
        Admin Panel
      </h1>

      {/* Add Temple */}

      <div className="card shadow mb-5">

        <div className="card-body">

          <h3>Add Temple</h3>

          <form onSubmit={addTemple}>

            <input
              className="form-control mb-3"
              placeholder="Temple Name"
              name="templeName"
              value={templeForm.templeName}
              onChange={handleTempleChange}
              required
            />

            <input
              className="form-control mb-3"
              placeholder="Location"
              name="location"
              value={templeForm.location}
              onChange={handleTempleChange}
              required
            />

            <textarea
              className="form-control mb-3"
              placeholder="Description"
              name="description"
              value={templeForm.description}
              onChange={handleTempleChange}
              required
            />

            <input
              className="form-control mb-3"
              placeholder="Image URL"
              name="image"
              value={templeForm.image}
              onChange={handleTempleChange}
            />

            <button className="btn btn-danger">
              Add Temple
            </button>

          </form>

        </div>

      </div>

      {/* Temples */}

      <div className="card shadow mb-5">

        <div className="card-body">

          <h3>Temples</h3>

          <table className="table">

            <thead>

              <tr>

                <th>Name</th>

                <th>Location</th>

                <th></th>

              </tr>

            </thead>

            <tbody>

              {temples.map((temple) => (

                <tr key={temple._id}>

                  <td>{temple.templeName}</td>

                  <td>{temple.location}</td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteTemple(temple._id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Add Slot */}

      <div className="card shadow mb-5">

        <div className="card-body">

          <h3>Add Slot</h3>

          <form onSubmit={addSlot}>

            <select
              className="form-select mb-3"
              name="temple"
              value={slotForm.temple}
              onChange={handleSlotChange}
              required
            >

              <option value="">
                Select Temple
              </option>

              {temples.map((temple) => (

                <option
                  key={temple._id}
                  value={temple._id}
                >
                  {temple.templeName}
                </option>

              ))}

            </select>

            <input
              type="date"
              className="form-control mb-3"
              name="date"
              value={slotForm.date}
              onChange={handleSlotChange}
              required
            />

            <input
              type="time"
              className="form-control mb-3"
              name="startTime"
              value={slotForm.startTime}
              onChange={handleSlotChange}
              required
            />

            <input
              type="time"
              className="form-control mb-3"
              name="endTime"
              value={slotForm.endTime}
              onChange={handleSlotChange}
              required
            />

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Seats"
              name="availableSeats"
              value={slotForm.availableSeats}
              onChange={handleSlotChange}
              required
            />

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Price"
              name="price"
              value={slotForm.price}
              onChange={handleSlotChange}
              required
            />

            <button className="btn btn-danger">
              Add Slot
            </button>

          </form>

        </div>

      </div>

      {/* Bookings */}

      <div className="card shadow">

        <div className="card-body">

          <h3>All Bookings</h3>

          <table className="table">

            <thead>

              <tr>

                <th>User</th>

                <th>Temple</th>

                <th>Persons</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {bookings.map((booking) => (

                <tr key={booking._id}>

                  <td>{booking.user?.name}</td>

                  <td>{booking.slot?.temple?.templeName}</td>

                  <td>{booking.numberOfPersons}</td>

                  <td>{booking.status}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Admin;