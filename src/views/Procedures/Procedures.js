import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Switch } from "react-router-dom";
import PrivateRoute from "../../components/Router/PrivateRoute";
import ProceduresTable from "../../components/Procedures/ProceduresTable";
import ProcedureForm from "../../components/Procedures/ProcedureForm";
import {
  getProcedures,
  createProcedure,
  updateProcedure,
  deleteProcedure,
} from "../../services/api";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
  LOAD_PROCEDURES,
  ADDED_PROCEDURE,
  UPDATED_PROCEDURE,
  DELETED_PROCEDURE,
  SELECT_PROCEDURE,
} from "../../store/actions";

class Procedures extends React.Component {
  async componentWillMount() {
    const { selectedPet, procedures, history } = this.props;

    if (!selectedPet) return history.replace("/dashboard");

    if (procedures.length) return;

    await this.fetchProcedures();
  }

  async fetchProcedures() {
    const { dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");
    try {
      dispatch({ type: REQUEST_SENT });
      const response = await getProcedures(petId);
      dispatch({
        type: LOAD_PROCEDURES,
        procedures: response.procedures,
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

  clickOnEditHandler(procedure) {
    const { dispatch, history } = this.props;
    dispatch({ type: SELECT_PROCEDURE, procedure });
    history.replace("/pet/records/procedures/update");
  }

  async handleProcedureCreation(procedure) {
    const { history, dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");
    try {
      dispatch({ type: REQUEST_SENT });
      await createProcedure(petId, procedure);
      dispatch({ type: ADDED_PROCEDURE });
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: "Procedure was successfully added",
        },
      });
      history.replace("/pet/records/procedures");
      await this.fetchProcedures();
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

  async handleProcedureUpdate(procedure) {
    const [, procedureId] = procedure.record.split("/");
    const { history, dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");

    try {
      dispatch({ type: REQUEST_SENT });
      await updateProcedure(petId, procedureId, procedure);
      dispatch({ type: UPDATED_PROCEDURE });
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: "Procedure was successfully updated",
        },
      });
      history.replace("/pet/records/procedures");
      await this.fetchProcedures();
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

  async handleProcedureDeletion(procedure) {
    const [, procedureId] = procedure.record.split("/");
    const { history, dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");

    try {
      dispatch({ type: REQUEST_SENT });
      await deleteProcedure(petId, procedureId);
      dispatch({ type: DELETED_PROCEDURE });
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: "Procedure was successfully deleted",
        },
      });
      history.replace("/pet/records/procedures");
      await this.fetchProcedures();
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
    const { loading, user, selectedProcedure, procedures } = this.props;

    return (
      <React.Fragment>
        <Switch>
          <PrivateRoute exact path="/pet/records/procedures">
            <ProceduresTable
              procedures={procedures}
              clickOnEditHandler={this.clickOnEditHandler.bind(this)}
              clickOnDeleteHandler={this.handleProcedureDeletion.bind(this)}
            />
          </PrivateRoute>
          <PrivateRoute exact path="/pet/records/procedures/add">
            <ProcedureForm
              formHandler={this.handleProcedureCreation.bind(this)}
              loading={loading}
            />
          </PrivateRoute>
          <PrivateRoute exact path="/pet/records/procedures/update">
            <ProcedureForm
              procedure={selectedProcedure}
              formHandler={this.handleProcedureUpdate.bind(this)}
              loading={loading}
            />
          </PrivateRoute>
        </Switch>
      </React.Fragment>
    );
  }
}

Procedures.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  selectedProcedure: PropTypes.object,
  procedures: PropTypes.array,
  selectedPet: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading } = state.app;
  const { selectedProcedure, procedures } = state.procedures;
  const { selectedPet } = state.pets;
  return { loading, selectedProcedure, procedures, selectedPet };
}

export default connect(mapStateToProps)(withRouter(Procedures));
