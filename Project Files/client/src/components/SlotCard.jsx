import { Link } from "react-router-dom";

function SlotCard({ slot }) {
  return (
    <div className="card mb-3 shadow-sm">

      <div className="card-body">

        <div className="row align-items-center">

          <div className="col-md-2">
            <h5 className="text-danger">
              ₹ {slot.price}
            </h5>
          </div>

          <div className="col-md-3">
            <strong>Date</strong>
            <br />
            {new Date(slot.date).toLocaleDateString()}
          </div>

          <div className="col-md-2">
            <strong>Time</strong>
            <br />
            {slot.startTime} - {slot.endTime}
          </div>

          <div className="col-md-2">
            <strong>Seats</strong>
            <br />
            {slot.availableSeats}
          </div>

          <div className="col-md-3 text-end">

            {slot.availableSeats > 0 ? (

              <Link
                to={`/booking/${slot._id}`}
                className="btn btn-danger"
              >
                Book Now
              </Link>

            ) : (

              <button
                className="btn btn-secondary"
                disabled
              >
                Full
              </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default SlotCard;