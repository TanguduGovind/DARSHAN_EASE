function Footer() {
  return (
    <footer
      className="text-white mt-5"
      style={{ backgroundColor: "#8B0000" }}
    >
      <div className="container py-4">

        <div className="row">

          <div className="col-md-6">

            <h4 className="fw-bold">
              🛕 DarshanEase
            </h4>

            <p className="mb-0">
              Temple Darshan Booking System
            </p>

            <small>
              Book your temple visits quickly and conveniently.
            </small>

          </div>

          <div className="col-md-6 text-md-end mt-4 mt-md-0">

            <p className="mb-1">
              React • Node.js • Express • MongoDB
            </p>

            <p className="mb-0">
              © {new Date().getFullYear()} DarshanEase.
              All Rights Reserved.
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;