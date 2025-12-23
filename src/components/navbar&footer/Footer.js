import React from "react";
import "./footer.css";
import { Link } from "react-router";
function Footer() {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="row">
              <div className="col-md-6 col-lg-3 about-footer">
                <h2>Divinéra </h2>
                <ul>
                  <li>
                    <a href="tel:(010) 1234 4321">
                      <i className="fas fa-phone fa-flip-horizontal"></i>(010)
                      1234 4321
                    </a>
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    1 / 105 Bay Lights,
                    <br />
                    Lorem Ipsum,
                    <br />
                    LIC 3201
                  </li>
                </ul>
                <Link to="/booking" className="btn red-btn">
                  Book Now
                </Link>
              </div>
              <div className="col-md-6 col-lg-2 page-more-info">
                <div className="footer-title">
                  <h4>Page links</h4>
                </div>
                <ul>
                  <li>
                    <Link to="/home">Home</Link>
                  </li>
                  <li>
                    <Link to="#">About</Link>
                  </li>
                  <li>
                    <Link to="#">Testimonial</Link>
                  </li>
                  <li>
                    <Link to="#">Blog</Link>
                  </li>
                  <li>
                    <Link to="#">Contact</Link>
                  </li>
                </ul>
              </div>

              <div className="col-md-6 col-lg-3 page-more-info">
                <div className="footer-title">
                  <h4>More Info</h4>
                </div>
                <ul>
                  <li>
                    <Link to="#">Lorem ipsum</Link>
                  </li>
                  <li>
                    <Link to="#">Dolor sit amet</Link>
                  </li>
                  <li>
                    <Link to="#">Consectetur Adipisicing </Link>
                  </li>
                  <li>
                    <Link to="#">Ed do eiusmod tempor incididunt</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 col-lg-4 open-hours">
                <div className="footer-title">
                  <h4>Open hours</h4>
                  <ul className="footer-social">
                    <li>
                      <Link to="" target="_blank">
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="" target="_blank">
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="" target="_blank">
                        <i className="fab fa-linkedin-in"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <i className="far fa-clock"></i>Friday
                      </td>
                      <td>9:00am - 5:00pm</td>
                    </tr>
                    <tr>
                      <td>
                        <i className="far fa-clock"></i>Saturday
                      </td>
                      <td>9:00am - 4:00pm</td>
                    </tr>
                    <tr>
                      <td>
                        <i className="far fa-clock"></i>Sunday
                      </td>
                      <td>9:00am - 1:30pm</td>
                    </tr>
                    <tr>
                      <td>
                        <i className="far fa-clock"></i>Monday
                      </td>
                      <td>9:30am - 12:00pm</td>
                    </tr>
                    <tr>
                      <td>
                        <i className="far fa-clock"></i>Tuesday
                      </td>
                      <td>9:30am - 12:00pm</td>
                    </tr>
                    <tr>
                      <td>
                        <i className="far fa-clock"></i>Wednesday
                      </td>
                      <td>9:30am - 12:00pm</td>
                    </tr>
                    <tr>
                      <td>
                        <i className="far fa-clock"></i>Thursday
                      </td>
                      <td>9:30am - 12:00pm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <hr />
          <div className="footer-bottom">
            <div className="row">
              <div className="col-sm-4">
                <Link to="">Privacy policy</Link>
              </div>
              <div className="col-sm-8">
                <p>Lorem ipsum dolor sit amet @ 2019 All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
