import React, { Component } from "react";
import { Link as Tag, animateScroll as scroll } from "react-scroll";
import { Link } from "react-router-dom";
import "./styles/App.css";
export class Navs extends Component {
  componentDidMount() {
    window.addEventListener("scroll", () => {
      const isTop = window.scrollY > 100;
      const nav = document.getElementById("navbar");
      if (nav === null)
        window.removeEventListener("scroll", this.componentDidMount);
      else if (isTop) nav.classList.add("active");
      else nav.classList.remove("active");
    });
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.componentDidMount);
  }
  render() {
    return (
      <div class="bg">
        <header class="header">
          <nav id="navbar" class="navbar navbar-expand-lg fixed-top py-3">
            <div class="container">
              <Link
                class="navbar-brand "
                to="/"
                onClick={() => scroll.scrollToTop()}
              >
                <i class="fab fa-ethereum"></i> Ether Car
              </Link>
              <button
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                class="navbar-toggler navbar-toggler-right"
              >
                <i class="fa fa-bars"></i>
              </button>

              <div id="navbarSupportedContent" class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item active">
                    <Link class="nav-link " to="/LandingPage">
                      Cars&nbsp;<i class="fas fa-car"></i>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link    ml-5" to="/Owner">
                      Owner&nbsp;<i class="fas fa-user-tie"></i>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link  ml-5" to="/Client">
                      Client&nbsp;<i class="fas fa-user"></i>
                    </Link>
                  </li>

                  <li class="nav-item">
                    <Link class="nav-link  ml-5" to="/Trns">
                      Statistics&nbsp;<i class="fas fa-cubes"></i>
                    </Link>
                  </li>

                  <li class="nav-item">
                    <Link class="nav-link  ml-5" to="/SignUp">
                      Sign Up&nbsp;<i class="fas fa-sign-in-alt"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div class="container">
          <div class="pt-5 text-white">
            <header class="py-5 mt-5">
              <h1 class="display-1">Ether Car.</h1>
              <h3 class="lead mb-0 text">Transparency. Trust . Security</h3>
            </header>
          </div>
        </div>
        <div className="regbtn ">
          <button className="btn btn1 mb-2 " to="/Owner">
            <Link class="nav-link" to="/Owner">
              Register Here!
            </Link>
          </button>
        </div>
        <div id="mySidenav" class="sidenav">
          <Tag to="team" id="about" smooth={true} duration={1000}>
            About
          </Tag>
          <Tag to="/" id="blog" smooth={true} duration={1000}>
            Contact
          </Tag>
          <Tag to="/" id="projects" smooth={true} duration={1000}>
            Social
          </Tag>
        </div>
      </div>
    );
  }
}

export default Navs;
