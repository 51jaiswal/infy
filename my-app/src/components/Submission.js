import axios from "axios";
import React, { Component, Fragment } from "react";
class Submission extends Component {
  state = {
    primary: this.props.primary,
    offical: this.props.finally,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/primaryData", this.state.primary)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("hihfi");
      });
  };
  render() {
    return (
      <Fragment>
        {/* {JSON.stringify(this.state.primary)}
        {JSON.stringify(this.state.offical)} */}
        <div style={{ padding: "40px" }} className="container-fluid">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <div className="card">
                <div className="card-header bg-custom">
                  <h3 className="text-primary text-center">Submit Details</h3>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>
                        First Name<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.primary.firstName}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="middleName">Middle Name</label>
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.primary.middleName}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        Last Name<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.primary.lastName}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        State<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.primary.state}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        City<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.primary.city}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        Organisation Name<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.offical.organisationName}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        Experiance<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        value={this.state.offical.experience}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        Salary<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        value={this.state.offical.salary}
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        Age<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        value={this.state.offical.age}
                        disabled={true}
                      />
                    </div>
                    <button
                      onSubmit={this.handleSubmit}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Submission;
