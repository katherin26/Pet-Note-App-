import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, NavLink, Switch } from "react-router-dom";
import PrivateRoute from "../../components/Router/PrivateRoute";
import PetProfile from "../../components/Pets/PetProfile";
import PetForm from "../../components/Pets/PetForm";
import Vaccinations from "../Vaccinations/Vaccionations";
import Procedures from "../Procedures/Procedures";
import Grooming from "../Grooming/Grooming";
import { updatePet } from "../../services/api";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
  UPDATED_PET,
} from "../../store/actions";

class PetRecords extends React.Component {
  componentWillMount() {
    const { selectedPet, history } = this.props;

    if (!selectedPet) history.replace("/dashboard");
  }

  async handlePetUpdate(pet) {
    const [, petId] = pet.record.split("/");
    const { history, dispatch } = this.props;

    try {
      dispatch({ type: REQUEST_SENT });
      await updatePet(petId, pet);
      dispatch({ type: UPDATED_PET, pet });
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: "Pet was successfully updated",
        },
      });
      history.replace("/pet/records/profile");
    } catch (e) {
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message:
            e.response && e.response.status === 422
              ? `${e.response.data.errors[0].param} ${e.response.data.errors[0].msg}`
              : e.message,
        },
      });
    } finally {
      dispatch({ type: REQUEST_FINISHED });
    }
  }

  render() {
    const { loading, user, selectedPet } = this.props;

    return (
      <React.Fragment>
        <ul className="flex border">
          <li className="-mb-px mr-1">
            <NavLink
              className="bg-white inline-block border border-gray-400 rounded-t-lg px-4 py-2 text-teal-800 font-bold"
              activeClassName="shadow-md"
              to="/pet/records/profile"
            >
              Pet Profile
            </NavLink>
          </li>
          <li className="mr-1">
            <NavLink
              className="bg-white inline-block border border-gray-400 rounded-t-lg px-4 py-2 text-teal-800 font-bold"
              activeClassName="shadow-md"
              to="/pet/records/vaccinations"
            >
              Vaccinations
            </NavLink>
          </li>
          <li className="mr-1">
            <NavLink
              className="bg-white inline-block border border-gray-400 rounded-t-lg px-4 py-2 text-teal-800 font-bold"
              activeClassName="shadow-md"
              to="/pet/records/procedures"
            >
              Procedures
            </NavLink>
          </li>
          <li className="mr-1">
            <NavLink
              className="bg-white inline-block border border-gray-400 rounded-t-lg px-4 py-2 text-teal-800 font-bold"
              activeClassName="shadow-md"
              to="/pet/records/grooming"
            >
              Grooming
            </NavLink>
          </li>
          <li className="mr-1">
            <NavLink
              className="bg-white inline-block border border-gray-400 rounded-t-lg px-4 py-2 text-teal-800 font-bold"
              activeClassName="shadow-md"
              to="/pet/records/pet-notes"
            >
              Pet-Notes
            </NavLink>
          </li>
          <li className="mr-1">
            <NavLink
              className="bg-white inline-block border border-gray-400 rounded-t-lg px-4 py-2 text-teal-800 font-bold"
              activeClassName="shadow-md"
              to="/pet/records/timeline"
            >
              Timeline
            </NavLink>
          </li>
        </ul>
        <Switch>
          <PrivateRoute path="/pet/records/profile/update">
            {selectedPet ? (
              <PetForm
                pet={selectedPet}
                formHandler={this.handlePetUpdate.bind(this)}
                loading={loading}
              />
            ) : (
              ""
            )}
          </PrivateRoute>
          <PrivateRoute path="/pet/records/profile">
            {selectedPet ? <PetProfile pet={selectedPet} /> : ""}
          </PrivateRoute>
          <PrivateRoute path="/pet/records/vaccinations">
            <Vaccinations />
          </PrivateRoute>
          <PrivateRoute path="/pet/records/procedures">
            <Procedures />
          </PrivateRoute>
          <PrivateRoute path="/pet/records/grooming">
            <Grooming />
          </PrivateRoute>
          <PrivateRoute path="/pet/records/pet-notes">
            <h1>Pet notes</h1>
          </PrivateRoute>
          <PrivateRoute path="/pet/records/timline">
            <h1>timeline</h1>
          </PrivateRoute>
        </Switch>
      </React.Fragment>
    );
  }
}

PetRecords.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  selectedPet: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading, user } = state.app;
  const { selectedPet } = state.pets;
  return { loading, user, selectedPet };
}

export default connect(mapStateToProps)(withRouter(PetRecords));
