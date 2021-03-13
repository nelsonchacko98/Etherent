import React, { Component } from "react";

export class footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer bg-dark">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <span className="copyright">
                  &copy;{new Date().getFullYear()} Ether Car - All Rights
                  Reserved
                </span>
              </div>
              <div className="col-md-6">
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="https://www.instagram.com/_rihab_rk/">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://twitter.com/am_rihu">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://www.linkedin.com/in/rihab-kasim-730255157">
                      <i class="fab fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default footer;
