import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { convertTimestampToISODate, convertDateToTimestamp } from "../../utils";

class PetForm extends React.Component {
  constructor(props) {
    super(props);
    const { pet } = props;

    if (pet) {
      const dob = convertTimestampToISODate(pet.dob);
      const rabies_exp = convertTimestampToISODate(pet.rabies_exp);
      this.state = { ...pet, dob, rabies_exp };
    } else {
      this.state = {
        name: "",
        breed: "",
        species: "",
        gender: "",
        dob: "",
        allergies: "",
        microchip: "",
        weight: "",
        rabies_tag: "",
        rabies_exp: "",
        sterilized: false,
      };
    }
  }

  handleSubmitClick(e) {
    const { formHandler } = this.props;
    e.preventDefault();
    const dob = convertDateToTimestamp(this.state.dob);
    const rabies_exp = convertDateToTimestamp(this.state.rabies_exp);
    formHandler({ ...this.state, dob, rabies_exp });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getSterilizedStyles() {
    return {
      active:
        "mr-2 bg-teal-500 text-white font-semibold  py-2 px-4 border border-teal-400  hover:border-teal-800 rounded",
      inactive:
        "mr-2 bg-transparent  text-teal-400 font-semibold  py-2 px-4 border border-teal-400  hover:border-teal-800 rounded",
    };
  }

  render() {
    const { loading, history } = this.props;
    return (
      <div className="flex justify-center items-center w-full h-full ">
        <div className=" w-full lg:w-2/5  rounded overflow-hidden shadow-lg mt-5 ">
          <img
            className=" w-1/5  mx-auto  border shadow-md rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTyh9RN_zqCyVLtyMLck56fHrPUbJMreylVa2pfUHUMGUCeqnZt&usqp=CAU"
          />
          <div className=" w-full px-6 py-4  ">
            <div className="flex justify-center items-center w-full h-full">
              <form
                className=" w-full max-w-lg h-1/5 "
                onSubmit={this.handleSubmitClick.bind(this)}
              >
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange.bind(this)}
                      placeholder="Pet Name"
                      required
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="breed"
                    >
                      Breed
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      name="breed"
                      value={this.state.breed}
                      onChange={this.handleInputChange.bind(this)}
                      placeholder="Poodle, Siamese Cat"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <div className="relative">
                      <select
                        value={this.state.species}
                        onChange={this.handleInputChange.bind(this)}
                        name="species"
                        className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        required
                      >
                        <option value="">Species</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Guinea Pig">Guinea Pig</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <div className="relative">
                      <select
                        value={this.state.gender}
                        onChange={this.handleInputChange.bind(this)}
                        name="gender"
                        className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        required
                      >
                        <option value="">Gender</option>
                        <option value="F">Female</option>
                        <option value="M">Male</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="birthday"
                    >
                      Birthday
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="date"
                      name="dob"
                      value={this.state.dob}
                      onChange={this.handleInputChange.bind(this)}
                      required
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="allergies"
                    >
                      Allergies
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      value={this.state.allergies}
                      onChange={this.handleInputChange.bind(this)}
                      name="allergies"
                      placeholder="Vaccine, Medical"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="microchip"
                    >
                      Microchip
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      name="microchip"
                      placeholder="Number"
                      value={this.state.microchip}
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="weight"
                    >
                      Weight
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="number"
                      name="weight"
                      placeholder="7lb"
                      value={this.state.weight}
                      onChange={this.handleInputChange.bind(this)}
                      min="1"
                      max="100"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="rabies_tag"
                    >
                      Rabies Tag
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      name="rabies_tag"
                      placeholder="number"
                      value={this.state.rabies_tag}
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="rabies_exp"
                    >
                      Rabies Tag Expiration
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="date"
                      name="rabies_exp"
                      value={this.state.rabies_exp}
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6 justify-center ">
                  <div className="w-full text-center">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="Stetilized"
                    >
                      Sterilized
                    </label>
                  </div>
                  <div>
                    <button
                      className={
                        this.state.sterilized
                          ? this.getSterilizedStyles().active
                          : this.getSterilizedStyles().inactive
                      }
                      onClick={() => this.setState({ sterilized: true })}
                      type="button"
                    >
                      Yes
                    </button>

                    <button
                      className={
                        !this.state.sterilized
                          ? this.getSterilizedStyles().active
                          : this.getSterilizedStyles().inactive
                      }
                      onClick={() => this.setState({ sterilized: false })}
                      type="button"
                    >
                      No
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <button
                    className="tooltip mt-2 mr-2 bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md"
                    type="submit"
                    disabled={loading}
                  >
                    <span className="tooltiptext">Submit</span>

                    <i className="fas fa-check-double"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => history.goBack()}
                    className="tooltip mt-2 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md"
                  >
                    <span className="tooltiptext">Cancel</span>

                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PetForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(PetForm);
