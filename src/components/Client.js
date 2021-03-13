import React, { Component } from "react";
import "./styles/App.css";
import Footer from "./footer";
class Client extends Component {
  render() {
    return (
      <div>
        <div className="client">
          <div className="container ">
            <div className="row">
              <div className="col-lg-12 ">
                <div
                  className="content mr-auto ml-auto"
                  style={{ width: "800px" }}
                >
                  <h5 className="info-title">Car in Hand</h5>

                  <div>
                    <div
                      className="col-lg-12 mt-3"
                      style={{ paddingBottom: "400px" }}
                    >
                      <div>
                        <div>
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Model</th>
                                <th scope="col">startDate</th>
                                <th scope="col">End Date</th>
                                <th scope="col">Total Fare</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.clients.map((client, key) => {
                                if (client.Client === this.props.acc)
                                  return (
                                    <tr key={key}>
                                      <th scope="row">{client.bcar}</th>
                                      <td>{client.startDate}...</td>
                                      <td>{client.endDate}</td>
                                      <td>{client.Fare.toString()} ETH</td>
                                    </tr>
                                  );
                                return null;
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default Client;
