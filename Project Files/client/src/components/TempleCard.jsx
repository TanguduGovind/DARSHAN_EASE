import { Link } from "react-router-dom";

function TempleCard({ temple }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">

        <img
          src={
            temple.image ||
            "https://via.placeholder.com/400x250?text=Temple"
          }
          className="card-img-top"
          alt={temple.templeName}
          style={{
            height: "220px",
            objectFit: "cover",
          }}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="card-title">
            {temple.templeName}
          </h5>

          <p className="text-muted mb-2">
            📍 {temple.location}
          </p>

          <p className="card-text">
            {temple.description.length > 100
              ? temple.description.substring(0, 100) + "..."
              : temple.description}
          </p>

          <Link
            to={`/temple/${temple._id}`}
            className="btn btn-danger mt-auto"
          >
            View Details
          </Link>

        </div>

      </div>
    </div>
  );
}

export default TempleCard;