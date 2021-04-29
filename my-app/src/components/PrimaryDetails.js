import React, { Component, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { primaryDetails } from "../action/details.action";
import OfficialDetails from "./OfficialDetails";
class PrimaryDetail extends Component {
  state = {
    form: {
      firstName: "",
      middleName: "",
      lastName: "",
      stateCheck: "",
      city: "",
    },
    formErrorMessage: {
      firstName: "",
      middleName: "",
      lastName: "",
      stateCheck: "",
      city: "",
    },
    formValid: {
      firstName: false,
      middleName: true,
      lastName: false,
      buttonActive: false,
      stateCheck: false,
      city: false,
      // check:false
    },
    states: [],
    city: [],
    statesError: "",
    cityError: "",
    official: false,
    // check:false
  };
  componentDidMount = () => {
    axios
      .get("http://localhost:3001/state")
      .then((res) => {
        console.log(res.data);
        this.setState({ states: res.data });
      })
      .catch((err) => {
        this.setState({ statesError: "there is some error in fetching state" });
      });
  };
  handleClick = () => {
    const {
      firstName,
      middleName,
      lastName,
      stateCheck,
      city,
    } = this.state.form;
    this.props.dispatch(
      primaryDetails(firstName, middleName, lastName, stateCheck, city)
    );
    this.setState({ official: true });
  };
  handlecity = () => {
    if (this.state.form.stateCheck) {
      this.setState({ formValid: { city: false } });
      axios
        .get("http://localhost:3001/" + this.state.form.stateCheck)
        .then((res) => {
          console.log("city", res.data);
          this.setState({ city: res.data });
        })
        .catch((err) => {
          this.setState({ cityError: "there is some error in fetching city " });
        });
    }
  };
  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const newForm = this.state.form;
    newForm[name] = value;
    this.setState({ form: newForm });
    this.validateField(name, value);
  };

  validateField = (name, value) => {
    const { formErrorMessage, formValid } = this.state;
    switch (name) {
      case "city":
        if (value === "") {
          formErrorMessage.city = "Field Required";
          formValid.city = false;
          console.log("before", this.state.formValid.city);
        } else {
          formErrorMessage.city = "";
          formValid.city = true;
          console.log("after", this.state.formValid.city);
        }
        break;
      case "stateCheck":
        if (value === "") {
          formErrorMessage.stateCheck = "Field Required";
          formValid.stateCheck = false;
          // console.log("before",this.state.formValid.stateCheck)
        } else {
          formErrorMessage.stateCheck = "";
          formValid.stateCheck = true;
          console.log("after", this.state.formValid.stateCheck);
        }
        break;
      case "firstName":
        if (value === "") {
          formErrorMessage.firstName = "Field Required";
          formValid.firstName = false;
        } else if (!value.match(/[A-Za-z]{1,}/)) {
          formErrorMessage.firstName = "Only Alphabet is allowed";
          formValid.firstName = false;
        } else {
          formErrorMessage.firstName = "";
          formValid.firstName = true;
        }
        break;

      case "lastName":
        if (value === "") {
          formErrorMessage.lastName = "Field Required";
          formValid.lastName = false;
        } else if (!value.match(/[a-zA-Z]{1,}/)) {
          formErrorMessage.lastName = "Only alphabet is allowed";
          formValid.lastName = false;
        } else {
          formErrorMessage.lastName = "";
          formValid.lastName = true;
        }
        break;
      default:
        break;
    }

    formValid.buttonActive =
      formValid.firstName &&
      formValid.middleName &&
      formValid.lastName &&
      formValid.stateCheck &&
      formValid.city;
    console.log("final button active", formValid.buttonActive);
    this.setState({ formErrorMessage: formErrorMessage, formValid: formValid });
  };
  // handleSubmit = (e) => {
  //   // e.preventDefault();
  //   // this.props.history.push("/official");
  //   this.setState({official:true})
  // };
  render() {
    const { form, formErrorMessage, formValid } = this.state;
    if (this.state.official) {
      return <OfficialDetails primary={this.props}></OfficialDetails>;
      // return(<OfficialDetails primary={this.state.form}></OfficialDetails>)
    }
    return (
      <Fragment>
        {JSON.stringify(this.props.name)}
        <div style={{ padding: "40px" }} className="container-fluid">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <div className="card">
                <div className="card-header bg-custom">
                  <h3 className="text-primary text-center">Primary Details</h3>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="firstName">
                        First Name<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={(e) => this.handleChange(e)}
                      />
                      <span className="text-danger">
                        {formErrorMessage.firstName}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="middleName">Middle Name</label>
                      <input
                        className="form-control"
                        type="text"
                        id="middleName"
                        name="middleName"
                        placeholder="Middle Name"
                        value={form.middleName}
                        onChange={(e) => this.handleChange(e)}
                      />
                      <span className="text-danger">
                        {formErrorMessage.middleName}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        Last Name<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={(e) => this.handleChange(e)}
                      />
                      <span className="text-danger">
                        {formErrorMessage.lastName}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="states">
                        State<span className="text-danger">*</span>
                      </label>
                      <select
                        onChange={(e) => this.handleChange(e)}
                        onMouseUp={this.handlecity}
                        className="form-control"
                        value={form.stateCheck}
                        name="stateCheck"
                        id="states"
                      >
                        <option value="">--select--</option>
                        {this.state.states &&
                          this.state.states.map((data, key) => (
                            <option key={key} value={data}>
                              {data}
                            </option>
                          ))}
                      </select>
                      <span className="text-danger">
                        {formErrorMessage.stateCheck}
                      </span>
                      <span className="text-danger">
                        {this.state.statesError}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <select
                        disabled={!formValid.stateCheck}
                        // onClick={this.handlecity}
                        onChange={this.handleChange}
                        className="form-control"
                        value={form.city}
                        name="city"
                        id="city"
                      >
                        <option value="">--select--</option>
                        {this.state.city &&
                          this.state.city.map((data, key) => (
                            <option key={key} value={data}>
                              {data}
                            </option>
                          ))}
                        <span className="text-danger">
                          {formErrorMessage.city}
                        </span>
                        <span className="text-danger">
                          {this.state.cityError}
                        </span>
                      </select>
                    </div>
                    <button
                      onClick={(e) => this.handleClick(e)}
                      disabled={!formValid.buttonActive}
                      className="btn btn-info"
                    >
                      Next
                    </button>
                    {/* <button onClick={this.checkName}>click</button> */}
                  </form>

                  {/* <h3>name:{this.props.name}</h3> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.primaryReducer.firstName,
    middleName: state.primaryReducer.middleName,
    lastName: state.primaryReducer.lastName,
    state: state.primaryReducer.states,
    city: state.primaryReducer.city,
  };
};
export default connect(mapStateToProps)(PrimaryDetail);
