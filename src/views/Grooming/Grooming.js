import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Switch } from "react-router-dom";
import PrivateRoute from "../../components/Router/PrivateRoute";
import GroomingTable from "../../components/Grooming/GroomingTable";
import GroomingForm from "../../components/Grooming/GroomingForm";
import {
  getGrooming,
  createGrooming,
  updateGrooming,
  deleteGrooming,
} from "../../services/api";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
  LOAD_GROOMING,
  ADDED_GROOMING,
  UPDATED_GROOMING,
  DELETED_GROOMING,
  SELECT_GROOMING,
} from "../../store/actions";

class Grooming extends React.Component {
  async componentWillMount() {
    const { selectedPet, grooming, history } = this.props;

    if (!selectedPet) return history.replace("/dashboard");

    if (grooming.length) return;

    await this.fetchGrooming();
  }

  async fetchGrooming() {
    const { dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");
    try {
      dispatch({ type: REQUEST_SENT });
      const response = await getGrooming(petId);
      dispatch({
        type: LOAD_GROOMING,
        grooming: response.grooming,
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

  clickOnEditHandler(grooming) {
    const { dispatch, history } = this.props;
    dispatch({ type: SELECT_GROOMING, grooming });
    history.replace("/pet/records/grooming/update");
  }

  async handleGroomingCreation(grooming) {
    const { history, dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");
    try {
      dispatch({ type: REQUEST_SENT });
      await createGrooming(petId, grooming);
      dispatch({ type: ADDED_GROOMING });
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: "Grooming was successfully added",
        },
      });
      history.replace("/pet/records/grooming");
      await this.fetchGrooming();
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

  async handleGroomingUpdate(grooming) {
    const [, groomingId] = grooming.record.split("/");
    const { history, dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");

    try {
      dispatch({ type: REQUEST_SENT });
      await updateGrooming(petId, groomingId, grooming);
      dispatch({ type: UPDATED_GROOMING });
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: "Grooming was successfully updated",
        },
      });
      history.replace("/pet/records/grooming");
      await this.fetchGrooming();
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

  async handleGroomingDeletion(grooming) {
    const [, groomingId] = grooming.record.split("/");
    const { history, dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");

    try {
      dispatch({ type: REQUEST_SENT });
      await deleteGrooming(petId, groomingId);
      dispatch({ type: DELETED_GROOMING });
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: "Grooming was successfully deleted",
        },
      });
      history.replace("/pet/records/grooming");
      await this.fetchGrooming();
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
    const { loading, user, selectedGrooming, grooming } = this.props;

    return (
      <React.Fragment>
        <Switch>
          <PrivateRoute exact path="/pet/records/grooming">
            <GroomingTable
              grooming={grooming}
              clickOnEditHandler={this.clickOnEditHandler.bind(this)}
              clickOnDeleteHandler={this.handleGroomingDeletion.bind(this)}
            />
          </PrivateRoute>
          <PrivateRoute exact path="/pet/records/grooming/add">
            <GroomingForm
              formHandler={this.handleGroomingCreation.bind(this)}
              loading={loading}
            />
          </PrivateRoute>
          <PrivateRoute exact path="/pet/records/grooming/update">
            <GroomingForm
              grooming={selectedGrooming}
              formHandler={this.handleGroomingUpdate.bind(this)}
              loading={loading}
            />
          </PrivateRoute>
        </Switch>
      </React.Fragment>
    );
  }
}

Grooming.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  selectedGrooming: PropTypes.object,
  grooming: PropTypes.array,
  selectedPet: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading } = state.app;
  const { selectedGrooming, grooming } = state.grooming;
  const { selectedPet } = state.pets;
  return { loading, selectedGrooming, grooming, selectedPet };
}

export default connect(mapStateToProps)(withRouter(Grooming));
