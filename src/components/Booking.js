import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import BgAnim from "./BgAnim";
import { DateRangePicker } from "react-dates";
import { withRouter } from "react-router-dom";
import { Link } from "react-scroll";
export class Booking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      sday: "",
      eday: "",
      day: 0,
    };
    this.changeDay = this.changeDay.bind(this);
  }
  changeDay() {
    this.setState({
      day: Math.abs(this.state.endDate - this.state.startDate) / (1000 * 86400),
    });
  }

  render() {
    const { model } = this.props.location.state;
    const { image } = this.props.location.state;
    const { reg } = this.props.location.state;
    const { id } = this.props.location.state;
    const { rate } = this.props.location.state;
    const { des } = this.props.location.state;
    console.log({ model }, { des });
    return (
      <div className="booking">
        <BgAnim />
        <div className="container">
          <div className="row">
            <div className=" col-lg-12 ">
              <div class="wrapper">
                <div class="product-img">
                  <img
                    src={`https://ipfs.io/ipfs/${image}`}
                    alt={image}
                    height="420"
                    width="327"
                  />
                </div>
                <div class="product-info">
                  <div class="product-text">
                    <h1>{model}</h1>
                    <h2>{reg}</h2>
                    <p>{des}</p>
                  </div>
                  <div class="product-price-btn">
                    <p>
                      <p className="rate">{rate} </p>ETH/day
                    </p>
                  </div>
                  <div className="arr ">
                    <p>
                      <Link to="client-form" smooth={true} duration={1000}>
                        <i class="arrow down"></i>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="client-form" id="client-form">
          <div className="row pt-5">
            <div className="col-lg-6"></div>
            <div className="col-lg-6">
              <div className="login-box">
                <h2>Book Here!</h2>
                <form
                  onSubmit={(event) => {
                    event.preventDefault(); //prevent from reloading the page
                    const name = this.Name.value;
                    const id = this.Id.value;
                    const phn = this.phn.value;
                    this.props.bookCar(
                      id,
                      name,
                      phn,
                      rate,
                      Intl.DateTimeFormat({
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(this.state.startDate),
                      Intl.DateTimeFormat({
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(this.state.endDate),
                      this.state.day
                    );
                  }}
                >
                  <div className="user-box">
                    <input
                      id="postContent"
                      type="text"
                      ref={(input) => {
                        this.Id = input;
                      }}
                      placeholder="car details"
                      defaultValue={id}
                      required
                    />
                    <label>Id</label>
                  </div>
                  <div className="user-box">
                    <input
                      id="postContent"
                      type="text"
                      ref={(input1) => {
                        this.Regno = input1;
                      }}
                      className="form-control"
                      placeholder="car details"
                      defaultValue={reg}
                      required
                    />
                    <label>Registration Number</label>
                  </div>
                  <div class="user-box">
                    <input
                      id="postContent"
                      type="text"
                      ref={(input1) => {
                        this.Model = input1;
                      }}
                      className="form-control"
                      placeholder="car details"
                      defaultValue={model}
                      required
                    />
                    <label>Car Model</label>
                  </div>
                  <div class="user-box">
                    <input
                      id="postContent"
                      type="text"
                      ref={(input1) => {
                        this.Name = input1;
                      }}
                      className="form-control"
                      required
                    />
                    <label>Name</label>
                  </div>
                  <div className="user-box">
                    <input
                      id="postContent"
                      type="text"
                      ref={(input1) => {
                        this.phn = input1;
                      }}
                      className="form-control"
                      required
                    />
                    <label>Mobile Number</label>
                  </div>

                  <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) =>
                      this.setState({ startDate, endDate })
                    } // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={(focusedInput) =>
                      this.setState({ focusedInput })
                    }
                    // PropTypes.func.isRequired,
                  />
                  <br />

                  <button
                    type="submit"
                    onClick={this.changeDay}
                    className="btn"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Submit
                  </button>
                  {/* <a href="/">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      Submit
                    </a> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Booking);

//  <div className="col-lg-6">

//   <div className="form-group mr-sm-2">
//     <input

//     />
//   </div>
//   <div className="form-group mr-sm-2">

//   </div>
//   <div className="form-group mr-sm-2">

//   </div>
//   <div className="form-group mr-sm-2">

//   </div>
//   <DateRangePicker
//     startDate={this.state.startDate} // momentPropTypes.momentObj or null,
//     startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
//     endDate={this.state.endDate} // momentPropTypes.momentObj or null,
//     endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
//     onDatesChange={({ startDate, endDate }) =>
//       this.setState({ startDate, endDate })
//     } // PropTypes.func.isRequired,
//     focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
//     onFocusChange={(focusedInput) =>
//       this.setState({ focusedInput })
//     }
//   // PropTypes.func.isRequired,
//   />
//   <button
//     type="submit"
//     onClick={this.changeDay}
//     className="btn btn-primary btn-block"
//   >
//     Submit
//                   </button>
//                 </form>
//               </div >
