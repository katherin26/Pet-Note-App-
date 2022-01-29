import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Switch } from "react-router-dom";
import PrivateRoute from "../../components/Router/PrivateRoute";
import VaccinationsTable from "../../components/Vaccinations/VaccinationsTable";
import VaccinationForm from "../../components/Vaccinations/VaccinationForm";
import {
  getVaccinations,
  createVaccination,
  updateVaccination,
  deleteVaccination,
} from "../../services/api";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
  LOAD_VACCINATIONS,
  ADDED_VACCINATION,
  UPDATED_VACCINATION,
  DELETED_VACCINATION,
  SELECT_VACCINATION,
  LOAD_MORE_VACCINATIONS,
} from "../../store/actions";

class Vaccinations extends React.Component {
  async componentWillMount() {
    const { selectedPet, vaccinations, history } = this.props;

    if (!selectedPet) return history.replace("/dashboard");

    if (vaccinations.length) return;

    await this.fetchVaccinations();
  }

  async fetchVaccinations() {
    const { dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");
    try {
      dispatch({ type: REQUEST_SENT });
      const response = await getVaccinations(petId);
      dispatch({
        type: LOAD_VACCINATIONS,
        vaccinations: response.vaccinations,
        next: response.next,
      });
    } catch (e) {
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: e.message,
        },
      });
    } finally {
      dispatch({ type: REQUEST_FINISHED });
    }
  }

  async fetchMoreVaccinations() {
    const { dispatch, selectedPet, nextToken } = this.props;
    const [, petId] = selectedPet.record.split("/");
    try {
      dispatch({ type: REQUEST_SENT });
      const response = await getVaccinations(petId, nextToken);
      dispatch({
        type: LOAD_MORE_VACCINATIONS,
        vaccinations: response.vaccinations,
        next: response.next,
      });
    } catch (e) {
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: e.message,
        },
      });
    } finally {
      dispatch({ type: REQUEST_FINISHED });
    }
  }

  clickOnEditHandler(vaccination) {
    const { dispatch, history } = this.props;
    dispatch({ type: SELECT_VACCINATION, vaccination });
    history.replace("/pet/records/vaccinations/update");
  }

  async handleVaccinationCreation(vaccination) {
    const { history, dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");
    try {
      dispatch({ type: REQUEST_SENT });
      await createVaccination(petId, vaccination);
      dispatch({ type: ADDED_VACCINATION });
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: "Vaccination was successfully added",
        },
      });
      history.replace("/pet/records/vaccinations");
      await this.fetchVaccinations();
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

  async handleVaccinationUpdate(vaccination) {
    const [, vaccinationId] = vaccination.record.split("/");
    const { history, dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");

    try {
      dispatch({ type: REQUEST_SENT });
      await updateVaccination(petId, vaccinationId, vaccination);
      dispatch({ type: UPDATED_VACCINATION });
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: "Vaccination was successfully updated",
        },
      });
      history.replace("/pet/records/vaccinations");
      await this.fetchVaccinations();
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

  async handleVaccinationDeletion(vaccination) {
    const [, vaccinationId] = vaccination.record.split("/");
    const { history, dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");

    try {
      dispatch({ type: REQUEST_SENT });
      await deleteVaccination(petId, vaccinationId);
      dispatch({ type: DELETED_VACCINATION });
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: "Vaccination was successfully deleted",
        },
      });
      history.replace("/pet/records/vaccinations");
      await this.fetchVaccinations();
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
    const {
      loading,
      user,
      selectedVaccination,
      vaccinations,
      nextToken,
      selectedPet,
    } = this.props;
    console.log(`vaccines for selected pet `);
    console.log(selectedPet);
    console.log(nextToken);
    return (
      <React.Fragment>
        <Switch>
          <PrivateRoute exact path="/pet/records/vaccinations">
            <VaccinationsTable
              vaccinations={vaccinations}
              clickOnEditHandler={this.clickOnEditHandler.bind(this)}
              clickOnDeleteHandler={this.handleVaccinationDeletion.bind(this)}
              showLoadMore={nextToken !== null && nextToken !== undefined}
              clickOnLoadMoreHandler={this.fetchMoreVaccinations.bind(this)}
            />
          </PrivateRoute>
          <PrivateRoute exact path="/pet/records/vaccinations/add">
            <VaccinationForm
              formHandler={this.handleVaccinationCreation.bind(this)}
              loading={loading}
            />
          </PrivateRoute>
          <PrivateRoute exact path="/pet/records/vaccinations/update">
            <VaccinationForm
              vaccination={selectedVaccination}
              formHandler={this.handleVaccinationUpdate.bind(this)}
              loading={loading}
            />
          </PrivateRoute>
        </Switch>
      </React.Fragment>
    );
  }
}

Vaccinations.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  selectedVaccination: PropTypes.object,
  vaccinations: PropTypes.array,
  selectedPet: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  nextToken: PropTypes.object,
};

function mapStateToProps(state) {
  const { loading } = state.app;
  const { selectedVaccination, vaccinations, next } = state.vaccinations;
  const { selectedPet } = state.pets;
  return {
    loading,
    selectedVaccination,
    vaccinations,
    selectedPet,
    nextToken: next,
  };
}

export default connect(mapStateToProps)(withRouter(Vaccinations));
