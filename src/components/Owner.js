import React, { Component } from "react";
import Ce from "./ce";
import Trip from "./TotalTrip";
import ipfs from "./ipfs";
import { db } from "./Base";
// import { Container, Row, Col, Button } from "react-bootstrap";
import Navtwo from "./Navtwo";
// import Test from "./Test";
import Footer from "./footer";
import "./styles/App.css";
export class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = { hash: "" };

    this.captureFile = this.captureFile.bind(this);
  }
  captureFile(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.hash = Buffer(reader.result);
      this.setState({ hash: this.hash });
      console.log("buffer", this.hash);
    };
  }

  render() {
    return (
      <div className="owner">
        <Navtwo />

        <section className="page-section" id="contact">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-12 text-center"
                style={{
                  paddingTop: "150px",
                }}
              >
                <h1
                  className="section-heading text-uppercase"
                  style={{
                    fontSize: "50px",
                    color: "#51ff00",
                  }}
                >
                  Car Ownership Details
                </h1>
                {/* <h3 className="section-subheading text-muted">
                    Lorem ipsum dolor sit amet consectetur.
                  </h3> */}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <form
                  onSubmit={(event) => {
                    event.preventDefault(); //prevent from reloading the page
                    ipfs.files.add(this.hash, (error, result) => {
                      if (error) {
                        console.error(error);
                        return;
                      }

                      this.Img = result[0].hash;

                      const regno = this.Regno.value;
                      const desc = this.desc.value;
                      const model = this.Model.value;
                      const rate = this.Rate.value;
                      console.log("ifpsHash", this.Img);
                      db.collection("messages")
                        .doc(regno)
                        .set({
                          distance: 0,
                          totaldistance: 0,
                        })
                        .then(function() {
                          console.log("Document successfully written!");
                        })
                        .catch(function(error) {
                          console.error("Error writing document: ", error);
                        });
                      this.props.addCar(regno, model, desc, this.Img, rate);
                    });
                  }}
                  id="contactForm"
                  name="sentMessage"
                  novalidate="novalidate"
                >
                  <div className="row">
                    <div className="col-md-6 form">
                      <div className="inside-form">
                        <input
                          className="form-control"
                          id="name"
                          type="text"
                          placeholder="Car Registration Number"
                          data-validation-required-message="Car Registration Number"
                          ref={(input) => {
                            this.Regno = input;
                          }}
                          required
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="inside-form">
                        <input
                          className="form-control"
                          id="email"
                          type="text"
                          placeholder="Car Model"
                          required="required"
                          ref={(input) => {
                            this.Model = input;
                          }}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                      <div class="inside-form">
                        <input
                          className="form-control"
                          id="phone"
                          type="text"
                          placeholder="Fare per day"
                          required
                          data-validation-required-message="Fare per day"
                          ref={(input) => {
                            this.Rate = input;
                          }}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <textarea
                          className="inside-textarea"
                          id="message"
                          placeholder="Owner details and Car condition"
                          required
                          data-validation-required-message="Owner details and Car condition"
                          ref={(input) => {
                            this.desc = input;
                          }}
                        ></textarea>
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-lg-12 text-center">
                      {/* <input type="file" onChange={this.captureFile} /> */}
                      <div>
                        <label htmlFor="upload-button">
                          {this.state.hash !== "" ? (
                            <img
                              src={`data:$png;base64,${new Buffer(
                                this.state.hash
                              ).toString("base64")}`}
                              alt="o"
                              height="100"
                              width="100"
                            />
                          ) : (
                            <div>
                              <span className="fa-stack fa-2x text-center text-white">
                                <i class="fas fa-cloud-upload-alt  ml-3"></i>
                              </span>
                              <h6 className="text-center text-white pl-3">
                                Upload Here
                              </h6>
                            </div>
                          )}
                        </label>
                        <input
                          type="file"
                          id="upload-button"
                          style={{ display: "none" }}
                          onChange={this.captureFile}
                        />
                        <br />
                      </div>
                    </div>
                    <div
                      className="col-lg-12 text-center"
                      style={{ paddingTop: "5px" }}
                    >
                      <button
                        type="submit"
                        className="btn book-btn"
                        style={{ padding: "5px", fontSize: "20px" }}
                      >
                        Submit Here !
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <div className="container ">
          {" "}
          <div
            className="row "
            style={{ paddingBottom: "300px", paddingTop: "100px" }}
          >
            <div className="col-lg-12 mt-3">
              <div className=" ">
                <div className=" ">
                  <h4 className="info-title">Rented Cars</h4>
                </div>
                <div className=" ">
                  <table className="table  ">
                    <thead className="thead">
                      <tr>
                        <th scope="col">Regno</th>
                        <th scope="col">Model</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Distance
                        </th>
                        <th>Total Trip</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.cars.map((car, key) => {
                        if (car.Owner === this.props.account) {
                          return (
                            <tr key={key}>
                              <td>{car.Regno}</td>
                              <td>{car.Model}</td>
                              <td>{car.Status}</td>
                              {car.Status === "Hired" ? (
                                <td>
                                  <button
                                    className="btn  deep-purple-text p-1 mx-0 mb-0 book-btn"
                                    onClick={() => {
                                      // event.preventDefault()
                                      this.props.endRent(car.id, car.Regno);
                                    }}
                                  >
                                    End Rent
                                  </button>
                                </td>
                              ) : (
                                <td>Not Rented</td>
                              )}
                              <td style={{ textAlign: "center" }}>
                                <Ce car={car} />
                              </td>
                              <td>
                                <Trip car={car} />
                              </td>
                            </tr>
                          );
                        }

                        return null;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Owner;

/* <Container className="" style={{ height: "200px" }}>
  <Row>
    <Col sm={4}>
      <Test />
    </Col>
    <Col sm={6}>
      <form
        onSubmit={(event) => {
          event.preventDefault(); //prevent from reloading the page
          ipfs.files.add(this.hash, (error, result) => {
            if (error) {
              console.error(error);
              return;
            }

            this.Img = result[0].hash;

            const regno = this.Regno.value;
            const desc = this.desc.value;
            const model = this.Model.value;
            const rate = this.Rate.value;
            console.log("ifpsHash", this.Img);
            this.props.addCar(regno, model, desc, this.Img, rate);
          });
        }}
      >
        <div className="form-group mr-sm-2">
          <input
            id="postContent"
            type="text"
            ref={(input) => {
              this.Regno = input;
            }}
            className="form-control"
            placeholder="Registration Number"
            required
          />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="postContent"
            type="text"
            ref={(input1) => {
              this.Model = input1;
            }}
            className="form-control"
            placeholder="Model"
            required
          />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="postContent"
            type="text"
            ref={(input2) => {
              this.Rate = input2;
            }}
            className="form-control"
            placeholder="Rate"
            required
          />
        </div>
        <div className="form-group mr-sm-2">
          <textarea
            id="postContent"
            type="text"
            ref={(input2) => {
              this.desc = input2;
            }}
            className="form-control"
            placeholder="Owner details and Car condition"
            required
          />
        </div>
        <div>
          {/* <input type="file" onChange={this.captureFile} /> */
//           <div>
//             <label htmlFor="upload-button">
//               {this.state.hash !== "" ? (
//                 <img
//                   src={`data:$png;base64,${new Buffer(
//                     this.state.hash
//                   ).toString("base64")}`}
//                   alt="o"
//                   height="100"
//                   width="100"
//                 />
//               ) : (
//                   <>
//                     <span className="fa-stack fa-2x text-center text-white">
//                       <i class="fas fa-cloud-upload-alt  ml-3"></i>
//                     </span>
//                     <h6 className="text-center text-white">
//                       Upload Here
//                           </h6>
//                   </>
//                 )}
//             </label>
//             <input
//               type="file"
//               id="upload-button"
//               style={{ display: "none" }}
//               onChange={this.captureFile}
//             />
//             <br />
//           </div>
//         </div>
//         <Button type="submit">Submit</Button>
//       </form>
//     </Col>
//   </Row>
// </Container> */}
