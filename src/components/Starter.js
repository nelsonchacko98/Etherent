import React, { Component } from "react";
import "./styles/App.css";
import Navs from "./Navs";
import Footer from "./footer";
export class Starter extends Component {
  render() {
    return (
      <div>
        <div>
          <Navs />
        </div>
        <section className="page-section" id="service">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2>Why Ether Car?</h2>
                <p className="pb-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                  ut voluptatum eius sapiente, totam reiciendis temporibus qui
                  quibusdam, recusandae sit vero unde, sed, incidunt et ea quo
                  dolore laudantium consectetur!Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Sunt ut voluptatum eius
                  sapiente, totam reiciendis temporibus qui quibusdam,
                  recusandae sit vero unde, sed, incidunt et ea quo dolore
                  laudantium consectetur!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className=" page-section" id="team">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase pt-5">
                  Our Amazing Team
                </h2>
                <h3 className="section-subheading text-muted">
                  Lorem ipsum dolor sit amet consectetur.
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <div className="team-member ">
                  <img className="mx-auto rounded-circle" src="" alt="" />
                  <h4>Akhilesh Nair</h4>
                  <p className="text-muted">IOT</p>
                  <ul className="list-inline social-buttons">
                    <li className="list-inline-item">
                      <a href="#something">
                        <i class="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#something">
                        <i class="fab fa-github"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#something">
                        <i class="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="team-member">
                  <img className="mx-auto rounded-circle" src="" alt="" />
                  <h4>IOT</h4>
                  <p className="text-muted">Lead Marketer</p>
                  <ul className="list-inline social-buttons">
                    <li className="list-inline-item">
                      <a href="#something">
                        <i class="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#something">
                        <i class="fab fa-github"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#something">
                        <i class="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="team-member">
                  <img
                    className="mx-auto rounded-circle"
                    //src="{require("../components/images/rihab.jpg")}"
                    alt=""
                  />
                  <h4>Rihab Kasim</h4>
                  <p className="text-muted">Blockchain</p>
                  <ul className="list-inline social-buttons">
                    <li className="list-inline-item">
                      <a href="#something">
                        <i class="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#something">
                        <i class="fab fa-github"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#something">
                        <i class="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <p className="large text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                  eaque, laboriosam veritatis, quos non quis ad perspiciatis,
                  totam corporis ea, alias ut unde.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Starter;
