import React, { Component } from "react";

export class SignUp extends Component {
  render() {
    return (
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault(); //prevent from reloading the page
            const name = this.name.value;
            const email = this.email.value;
            this.props.authorizeAccount(name, email);
          }}
        >
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                ref={(input2) => {
                  this.name = input2;
                }}
              />
            </div>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              ref={(input2) => {
                this.email = input2;
              }}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onSubmit={() => this.props.authorizeAccount()}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
