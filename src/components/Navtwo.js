import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Navtwo extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg fixed-top  navtwo">
          <div className="container">
            <Link className="navbar-brand " to="/">
              <i className="fab fa-ethereum"></i> Ether Car
            </Link>
            <button
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              className="navbar-toggler navbar-toggler-right"
            >
              <i className="fa fa-bars"></i>
            </button>

            <div
              id="navbarSupportedContent"
              className="collapse navbar-collapse"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link " to="/LandingPage">
                    Cars&nbsp;<i className="fas fa-car"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link   ml-5" to="/Owner">
                    Owner&nbsp;<i className="fas fa-user-tie"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link  ml-5" to="/Client">
                    Client&nbsp;<i className="fas fa-user"></i>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link  ml-5" to="/Trns">
                    Statistics&nbsp;<i className="fas fa-cubes"></i>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link  ml-5" to="/SignUp">
                    Sign Up&nbsp;<i className="fas fa-sign-in-alt"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navtwo;
