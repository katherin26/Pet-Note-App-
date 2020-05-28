import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { convertTimestampToISODate, convertDateToTimestamp } from "../../utils";

class ProcedureForm extends React.Component {
  constructor(props) {
    super(props);
    const { procedure } = props;

    if (procedure) {
      const date = convertTimestampToISODate(procedure.date);
      this.state = { ...procedure, date };
    } else {
      this.state = {
        name: "",
        date: "",
        comments: "",
        cost: 0,
        location: "",
      };
    }
  }

  handleSubmitClick(e) {
    const { formHandler } = this.props;
    e.preventDefault();
    const date = convertDateToTimestamp(this.state.date);
    formHandler({ ...this.state, date });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { loading, history } = this.props;
    return (
      <div className="flex justify-center items-center w-full h-full">
        <form
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 lg:w-1/4 md:w-1/3 sm:w-1/2"
          onSubmit={this.handleSubmitClick.bind(this)}
        >
          <div className="w-full ">
            <label
              className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleInputChange.bind(this)}
              placeholder="e.g. Bordetella"
              required
            />
          </div>

          <div className="w-full ">
            <label
              className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              name="date"
              type="date"
              value={this.state.date}
              onChange={this.handleInputChange.bind(this)}
              required
            />
          </div>

          <div className="w-full ">
            <label
              className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              name="location"
              type="text"
              placeholder="Vet Clinic"
              value={this.state.location}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>

          <div className="w-full ">
            <label
              className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
              htmlFor="cost"
            >
              Cost
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              name="cost"
              type="number"
              placeholder="30.00"
              value={this.state.cost}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>

          <div className="w-full ">
            <label
              className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
              htmlFor="comments"
            >
              Pet-Note
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              name="comments"
              type="text"
              placeholder="Notes..."
              value={this.state.comments}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>

          <div className="flex items-center justify-start">
            <button
              className="tooltip mt-2 mr-2 bg-teal-400 hover:bg-teal-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              <span className="tooltiptext">Submit</span>
              <i className="fas fa-check-double"> </i>
            </button>
            <button
              className="tooltip mt-2 bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => history.goBack()}
            >
              <span className="tooltiptext">Cancel</span>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ProcedureForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(ProcedureForm);
