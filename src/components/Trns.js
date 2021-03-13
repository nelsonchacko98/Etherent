import React, { Component } from "react";
import "./styles/App.css";
import Web3 from "web3";
import Footer from "./footer";
class Trns extends Component {
  async componentWillMount() {
    // Load Web3
    let web3 = new Web3("http://127.0.0.1:7545");

    // Fetch latest block
    let latestBlock = await web3.eth.getBlock("latest");
    console.log("latest block", latestBlock);
    this.setState({
      blockNumber: latestBlock.number,
      difficulty: latestBlock.difficulty,
    });

    // Fetch Gas price
    let gasPrice = await web3.eth.getGasPrice();
    console.log("gasPrice", gasPrice);
    this.setState({
      gasPrice: gasPrice,
    });

    // Fetch latest 10 blocks
    let block;
    let latestBlocks = [];
    for (let i = 0; i < 5; i++) {
      block = await web3.eth.getBlock(latestBlock.number - i);
      console.log(block);
      latestBlocks.push(block);
    }
    this.setState({
      latestBlocks: latestBlocks,
    });

    this.setState({
      time: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(block.timestamp),
    });
  }

  //  let receipt = web3.eth.getTransactionReceipt('')
  //   console.log('gasPrice', receipt)
  //   this.setState({
  //     gasPrice: gasPrice
  //   })

  constructor(props) {
    super(props);
    this.state = {
      blockNumber: 0,
      difficulty: 120,
      gasPrice: 0,
      latestBlocks: [],
      time: "",
    };
  }

  render() {
    return (
      <div className="stats">
        <div className="container">
          <div style={{ paddingTop: "100px" }}>
            <div className="row">
              <div class="card-1 col-md-3 ml-5">
                <div class="card-body">
                  <h2
                    class="card-title"
                    style={{ fontSize: "20px", opacity: "0.5" }}
                  >
                    Latest Block
                  </h2>
                  <p class="card-text" style={{ textAlign: "center" }}>
                    {this.state.blockNumber}
                  </p>
                </div>
              </div>
              <div class="card-1 col-md-3 ml-5">
                <div class="card-body">
                  <h2
                    class="card-title"
                    style={{ fontSize: "20px", opacity: "0.5" }}
                  >
                    Gas Price
                  </h2>
                  <p class="card-text" style={{ textAlign: "center" }}>
                    {this.state.gasPrice}
                  </p>
                </div>
              </div>
              <div class="card-1 col-md-3 ml-5 mr-0">
                <div class="card-body">
                  <h2
                    class="card-title"
                    style={{ fontSize: "20px", opacity: "0.5" }}
                  >
                    Difficulty
                  </h2>
                  <p class="card-text" style={{ textAlign: "center" }}>
                    {this.state.difficulty}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h2 style={{ paddingTop: "40px", color: "white" }}>
                Ethereum Blockchain Explorer
              </h2>
            </div>

            <div
              className="row"
              style={{ paddingLeft: "200px", paddingBottom: "100px" }}
            >
              <div className="col-lg-12">
                <h5 style={{ color: "white" }}>Latest Blocks</h5>

                <table className="table blocks">
                  <thead>
                    <tr>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Block Number
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Hash
                      </th>
                      <th scope="col">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.latestBlocks.map((block, key) => {
                      return (
                        <tr key={key}>
                          <td
                            style={{
                              textAlign: "center",
                              border: "0",
                            }}
                          >
                            {block.number}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              border: "0",
                            }}
                          >
                            {block.hash.substring(0, 20)}...
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              border: "0",
                            }}
                          >
                            {block.timestamp}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Trns;
