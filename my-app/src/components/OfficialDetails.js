import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Submission from "./Submission";
import {officialDetails, primaryDetails} from "../action/details.action"
import PrimaryDetail from "../components/PrimaryDetails"
class OfficialDetails extends Component {
  state = {
     primary:this.props.primary, 
    form: {
      organisationName: "",
      experiance: "",
      salary: "",
      age: "",
    },
    formErrorMessage: {
      organisationName: "",
      experiance: "",
      salary: "",
      age: "",
     
    },
    formValid: {
      organisationName: false,
      experiance: false,
      salary: false,
      age: false,
       buttonActive:false
    },
    final:false,
  };
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newForm = this.state.form; //--------
    newForm[name] = value; //------------------
    this.setState({ form: newForm });
    this.validateField(name, value);
  };
  // handleClick=()=>{
  //    // this.props.history.push("/submit")
  //    this.setState({final:true})
  // }
  handleClick=()=>{
    const {organisationName,experiance,salary,age} = this.state.form
    this.props.dispatch(officialDetails(organisationName,experiance,salary,age))
    this.setState({final:true})
  }
  validateField = (name, value) => {
    const { formErrorMessage, formValid } = this.state;
    switch (name) {
      case "organisationName":
        if (value === "") {
          formErrorMessage.organisationName = "field required";
          formValid.organisationName = false;
        } else {
          formErrorMessage.organisationName = "";
          formValid.organisationName = true;
        }
        break;
      case "experiance":
        if (value === "") {
          formErrorMessage.experiance = "field required";
          formValid.experiance = false;
        } else if (value < 0) {
          formErrorMessage.experiance = "Experience can't be negative";
          formValid.experiance = false;
        } else {
          formErrorMessage.experiance = "";
          formValid.experiance = true;
        }
        break;
      case "salary":
        if (value === "") {
          formErrorMessage.salary = "field required";
          formValid.salary = false;
        } else if (value <= 0) {
          formErrorMessage.salary = "salary must be greater than 0";
          formValid.salary = false;
        } else {
          formErrorMessage.salary = "";
          formValid.salary = true;
        }
        break;
        case "age":
        if (value === "") {
          formErrorMessage.age = "field required";
          formValid.age = false;
        } else if (value <= 18 ) {
          formErrorMessage.age = "come on !!! age must be greater than 18"
          formValid.age = false;
        } else {
          formErrorMessage.age = "";
          formValid.age = true;
        }
        break;
      default:
        break;
    }
    formValid.buttonActive=formValid.salary && formValid.experiance &&
     formValid.age && formValid.organisationName;
    this.setState({formErrorMessage:formErrorMessage,formValid:formValid})
  };
  render() {
    const { formErrorMessage, form, formValid } = this.state;
    if(this.state.final){
        return (<Submission primary={this.state.primary} finally={this.props}></Submission>)
    }
    return (
      <Fragment>
        
          {JSON.stringify(this.state.primary.firstName)}
        <div style={{ padding: "40px" }} className="container-fluid">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <div className="card">
                <div className="card-header bg-custom">
                  <h3 className="text-primary text-center">Official Details</h3>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="organisationName">
                        Organisation Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="organisationName"
                        name="organisationName"
                        placeholder="Organisation Name"
                        value={form.organisationName}
                        onChange={(e) => this.handleChange(e)}
                      />
                      <span className="text-danger">
                        {formErrorMessage.organisationName}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="experiance">Experiance</label>
                      <input
                        className="form-control"
                        type="number"
                        id="experiance"
                        name="experiance"
                        placeholder="experiance"
                        value={form.experiance}
                        onChange={(e) => this.handleChange(e)}
                      />
                      <span className="text-danger">
                        {formErrorMessage.experiance}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="salary">Salary</label>
                      <input
                        className="form-control"
                        type="number"
                        id="salary"
                        name="salary"
                        placeholder="salary"
                        value={form.salary}
                        onChange={(e) => this.handleChange(e)}
                      />
                      <span className="text-danger">
                        {formErrorMessage.salary}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="age">Age</label>
                      <input
                        className="form-control"
                        type="number"
                        id="age"
                        name="age"
                        placeholder="age"
                        value={form.age}
                        onChange={(e) => this.handleChange(e)}
                      />
                      <span className="text-danger">
                        {formErrorMessage.age}
                      </span>
                    </div>
                    <button className="btn btn-info" onClick={this.handleClick} disabled={!formValid.buttonActive}>Next</button>
                    {/* <button onClick={this.checkOfficial}>click</button> */}
                  </form>
                  
                  {/* <h3>{this.state.primary.firstName}</h3> */}
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
      organisationName:state.officialReducer.orgName,
      experience:state.officialReducer.experience,
      salary:state.officialReducer.salary,
      age:state.officialReducer.age
  }
}

//  connect(mapStateToProps)(PrimaryDetail);
// export default (OfficialDetails);
export default connect(mapStateToProps)(OfficialDetails);
