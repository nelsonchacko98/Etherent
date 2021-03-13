import React, { Component } from "react";
import Web3 from "web3";
import "./styles/App.css";
import Ownable from "../abis/Ownable.json";
import Landingpage from "./LandingPage";
import Trns from "./Trns";
import Booking from "./Booking";
import loading_animation from "./loading-bars.svg";
import styles from "./loading.module.sass";
import { Route } from "react-router-dom";
import Owner from "./Owner";
import Client from "./Client";
import Starter from "./Starter";
import SignUp from "./SignUp";
import Navtwo from "./Navtwo";
import Test from "./Test";
// import { db } from "./Base";
class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    // await this.checkAuthorization();
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = Ownable.networks[networkId];
    if (networkData) {
      const ownable = web3.eth.Contract(Ownable.abi, networkData.address);
      this.setState({ ownable });
      const carCount = await ownable.methods.carCount().call();
      this.setState({ carCount });
      const clientCount = await ownable.methods.clientCount().call();
      this.setState({ clientCount });
      const userCount = await ownable.methods.userCount().call();
      this.setState({ userCount });
      // Load Posts
      for (var i = 1; i <= carCount; i++) {
        const car = await ownable.methods.cars(i).call();
        this.setState({
          cars: [...this.state.cars, car],
        });
      }
      console.log(this.state.cars);
      for (var j = 1; j <= clientCount; j++) {
        const client = await ownable.methods.clients(j).call();
        this.setState({
          clients: [...this.state.clients, client],
        });
      }
      console.log(this.state.clients);
      for (var k = 1; k <= userCount; k++) {
        const user = await ownable.methods.users(k).call();
        this.setState({
          users: [...this.state.users, user],
        });
        if (user.user === this.state.account)
          this.setState({ authorized: true });
      }
      console.log(this.state.users);
      this.setState({ loading: false });
    } else {
      window.alert("SocialNetwork contract not deployed to detected network.");
    }
  }

  //  rentList(){
  //   for (var i = 0; i <this.state.carCount; i++) {
  //          if(this.state.cars[i].Owner===this.state.account)
  //            this.setState({Rented:true})
  //            break;
  //   }
  // }

  addCar(regno, model, desc, imgHash, rate) {
    this.setState({ loading: true });
    let amt = window.web3.utils.toWei(rate, "Ether");
    this.state.ownable.methods
      .addCar(regno, model, desc, imgHash, rate)
      .send({ value: amt * 2, from: this.state.account })
      .on("receipt", (receipt) => {
        console.log(this.state.loading);
        this.setState({ loading: false });
        console.log(this.state.loading);
      });
  }

  bookCar(id, name, phno, rate, start, end, day) {
    let amt = window.web3.utils.toWei(rate, "Ether");
    this.state.ownable.methods
      .bookCar(id, name, phno, start, end, rate * day)
      .send({ value: amt * day, from: this.state.account })
      .on("transactionHash", (hash) => {
        console.log(hash);
        this.setState({ hash });
      });
  }
  authorizeAccount(name, email) {
    this.state.ownable.methods
      .authorizeAccount(this.state.account, name, email)
      .send({ from: this.state.account });
  }

  endRent(id, regno) {
    // let amt = window.web3.utils.toWei("4", "Ether");
    console.log(typeof this.state.account);
    console.log("0xafe74dec1686e44b72aa9f4f236233e7614f7de6");
    this.state.ownable.methods.endRent(id).send({ from: this.state.account });
  }

  constructor(props) {
    super(props);

    this.state = {
      account: "",
      authorized: false,
      loading: true,
      ownable: null,
      carCount: 0,
      userCount: 0,
      clientCount: 0,
      users: [],
      cars: [],
      clients: [],
    };

    this.addCar = this.addCar.bind(this);
    this.bookCar = this.bookCar.bind(this);
    this.endRent = this.endRent.bind(this);
    this.authorizeAccount = this.authorizeAccount.bind(this);
  }

  render() {
    return (
      <div>
        {/* <p>{this.state.hash}</p> */}
        <Route path="/" component={Starter} exact />
        <Route path="/Test" component={Test} exact />
        <Route
          path="/SignUp"
          render={() => (
            <div>
              <Navtwo />
              <SignUp authorizeAccount={this.authorizeAccount} />
            </div>
          )}
          exact
        />
        <Route
          path="/LandingPage"
          render={() => (
            <div>
              {this.state.loading ? (
                <div className={styles.loading_background}>
                  <img src={loading_animation} className={styles.svg} alt="" />
                </div>
              ) : (
                <div>
                  <Navtwo />
                  <Landingpage
                    cars={this.state.cars}
                    authorized={this.state.authorized}
                  />
                </div>
              )}
            </div>
          )}
        />
        <Route
          path="/Booking"
          render={(props) => (
            <div>
              <Navtwo />
              <Booking
                cars={this.state.cars}
                clients={this.state.clients}
                bookCar={this.bookCar}
              />
            </div>
          )}
        />
        <Route
          path="/Owner"
          render={(props) => (
            <div>
              <Owner
                account={this.state.account}
                cars={this.state.cars}
                clients={this.state.clients}
                addCar={this.addCar}
                endRent={this.endRent}
              />
            </div>
          )}
        />
        <Route
          path="/Client"
          render={(props) => (
            <div>
              <Navtwo />
              <Client
                clients={this.state.clients}
                cars={this.state.cars}
                acc={this.state.account}
              />
            </div>
          )}
        />
        <Route
          path="/Trns"
          render={(props) => (
            <div>
              <Navtwo />
              <Trns />
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
