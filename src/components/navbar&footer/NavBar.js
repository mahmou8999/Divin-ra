import { Link } from "react-router-dom";
export function isLoggedIn() {
  const user = sessionStorage.getItem("loggedInUser");
  return !!user;
}
function NavBar() {
  return (
    <div>
      <nav className={` navbar navbar-expand-md   `}>
        <div className="container-fluid py-2">
          <Link to="/" className="btn btn-light rounded-pill fw-bold me-2">
            Divinéra
          </Link>
          <button
            className="navbar-toggler d-md-none ms-auto border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center d-none d-md-flex">
            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                {/* <Link
                  to="/about"
                  className="btn btn-outline-light rounded-pill px-4 fw-semibold"
                >
                  About
                </Link> */}
              </li>
              <li className="nav-item">
                <Link
                  to="/products"
                  className="btn btn-outline-light rounded-pill px-4 fw-semibold"
                >
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/booking"
                  className="btn btn-outline-light rounded-pill px-4 fw-semibold"
                >
                  Book an appointment
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/cart"
                  className="btn btn-outline-light rounded-pill px-4 fw-semibold"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div className="d-none d-md-flex gap-2 align-items-center">
            <Link
              to="/login"
              className={`btn btn-outline-light ${
                isLoggedIn() ? "d-none" : ""
              }`}
            >
              Login
            </Link>
            <Link
              onClick={() => {
                sessionStorage.removeItem("loggedInUser");
              }}
              to="/login"
              className={`btn btn-outline-light  ${
                isLoggedIn() ? "d-block" : "d-none"
              }`}
            >
              LogOut
            </Link>
            <Link
              to="/register"
              className={`btn btn-light ${isLoggedIn() ? "d-none" : ""} `}
            >
              Register
            </Link>
          </div>
        </div>

        <div
          className="offcanvas offcanvas-end text-bg-dark d-md-none"
          tabIndex="-1"
          id="mobileMenu"
          aria-labelledby="mobileMenuLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="mobileMenuLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body d-flex flex-column gap-3">
            {/* <Link to="/about" className="btn btn-outline-light rounded-pill">
              About
            </Link> */}
            <Link to="/products" className="btn btn-outline-light rounded-pill">
              Products
            </Link>
            <Link to="/booking" className="btn btn-outline-light rounded-pill">
              Booking
            </Link>
            <Link
              to="/cart"
              className="btn btn-outline-light rounded-pill px-4 fw-semibold"
            >
              Cart
            </Link>
            <hr className="border-light" />
            <Link
              to="/login"
              className={`btn btn-outline-light ${
                isLoggedIn() ? "d-none" : ""
              }`}
            >
              Login
            </Link>
            <Link
              onClick={() => {
                sessionStorage.removeItem("loggedInUser");
              }}
              to="/login"
              className={`btn btn-outline-light  ${
                isLoggedIn() ? "d-block" : "d-none"
              }`}
            >
              LogOut
            </Link>
            <Link
              to="/register"
              className={`btn btn-light ${isLoggedIn() ? "d-none" : ""} `}
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
