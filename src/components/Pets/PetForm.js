import React from "react";

export default class PetForm extends React.Component {
  constructor(props) {
    super(props);
    const { pet } = props;

    if (pet) this.state = { ...pet };
    else {
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
      };
    }
  }

  handleSubmitClick(e) {
    const { formHandler } = this.props;
    e.preventDefault();
    formHandler({ ...this.state });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-1/2 rounded overflow-hidden shadow-lg ">
          <img
            className=" w-1/3 mx-auto  border shadow-md rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTyh9RN_zqCyVLtyMLck56fHrPUbJMreylVa2pfUHUMGUCeqnZt&usqp=CAU"
          />
          <div className="px-6 py-4">
            <div className="flex justify-center items-center w-full h-full">
              <form
                className=" w-full max-w-lg"
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
                      placeholder="Pet Name"
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
                      placeholder="Poodle, Siamese Cat"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <div className="relative">
                      <select className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
                        <option>Dog</option>
                        <option>Cat</option>
                        <option>Guinea Pig</option>
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
                      <select className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
                        <option>Female</option>
                        <option>Male</option>
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
                      htmlFor="grid-first-name"
                    >
                      Birthday
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="31/10/17"
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="grid-allergies"
                    >
                      Allergies
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="Vaccine, Medical"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="grid-microchip"
                    >
                      Microchip
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="Number"
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="grid-weight"
                    >
                      Weight
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="number"
                      placeholder="7lb"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="grid-licensenumber"
                    >
                      Rabies Tag
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="number"
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="grid-expirationdate"
                    >
                      Rabies Tag Expiration
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6 justify-center ">
                  <div className="w-full text-center">
                    <label
                      className="block uppercase tracking-wide text-teal-800 text-xs font-bold mb-2"
                      htmlFor="grid-expirationdate "
                    >
                      Sterilized
                    </label>
                  </div>
                  <div>
                    <button
                      className="mr-2 bg-transparent  text-teal-400 font-semibold  py-2 px-4 border border-teal-400  hover:border-teal-800 rounded"
                      type="button"
                      id="yes-btn"
                    >
                      Yes
                    </button>

                    <button
                      className="bg-transparent text-teal-400 font-semibold py-2 px-4 border border-teal-400 hover:border-teal-800 rounded"
                      type="button"
                      id="no-btn"
                    >
                      No
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <button
                    className="tooltip mt-2 mr-2 bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    <span className="tooltiptext">Submit</span>

                    <i className="fas fa-check-double"></i>
                  </button>
                  <button className="tooltip mt-2 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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
