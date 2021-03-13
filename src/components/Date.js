import React, { Component } from 'react'
//import {Row, Col, BreakRow, config} from 'react-colrow'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker} from 'react-dates';
// import { Link} from 'react-router-dom';
class Date extends Component {

  constructor(props) {
    super(props)
    this.state={

      startDate:null,
      endDate:null,
      day:0
    }
    // this.nDays = this.nDays.bind(this)
  };

  // nDays=()=>{
  //  this.setState({day: Math.abs(this.state.endDate-this.state.startDate) / (1000*86400)})  
   
  // }
  render() {
    return (
      <div>

<DateRangePicker
  dateFo
  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
  
  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
  onDatesChange={({ startDate, endDate}) => this.setState({ startDate, endDate})} // PropTypes.func.isRequired,
  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
  onFocusChange={focusedInput =>this.setState({focusedInput,day: Math.abs(this.state.endDate-this.state.startDate) / (1000*86400)})}
 // PropTypes.func.isRequired,
  
/>
<br/>
{/* <Link to="/Client">Client</Link> */}
 </div>


    );
  }
}

export default Date

