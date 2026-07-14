import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";
import TempleCard from "../components/TempleCard";
import Loader from "../components/Loader";

function Home() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      const response = await api.get("/temples");

      setTemples(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load temples.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container py-5">

      <div className="text-center mb-5">

        <h1
          className="fw-bold"
          style={{ color: "#8B0000" }}
        >
          Temple Darshan Booking
        </h1>

        <p className="text-muted">
          Choose your temple and book your darshan slot online.
        </p>

      </div>

      {temples.length === 0 ? (

        <div className="alert alert-warning text-center">
          No temples available.
        </div>

      ) : (

        <div className="row">

          {temples.map((temple) => (
            <TempleCard
              key={temple._id}
              temple={temple}
            />
          ))}

        </div>

      )}

    </div>
  );
}

export default Home;