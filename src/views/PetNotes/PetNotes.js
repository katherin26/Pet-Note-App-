import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Switch } from "react-router-dom";
import PrivateRoute from "../../components/Router/PrivateRoute";
import PetNoteCards from "../../components/PetNotes/PetNoteCards";
import PetNoteForm from "../../components/PetNotes/PetNoteForm";
import {
  getPetNotes,
  createPetNote,
  updatePetNote,
  deletePetNote,
} from "../../services/api";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
  LOAD_REMINDERS,
  ADDED_REMINDER,
  UPDATED_REMINDER,
  DELETED_REMINDER,
  SELECT_REMINDER,
} from "../../store/actions";

class PetNotes extends React.Component {
  async componentWillMount() {
    const { selectedPet, petnotes, history } = this.props;

    if (!selectedPet) return history.replace("/dashboard");

    if (petnotes.length) return;

    await this.fetchPetNotes();
  }

  async fetchPetNotes() {
    const { dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");
    try {
      dispatch({ type: REQUEST_SENT });
      const response = await getPetNotes(petId);
      dispatch({
        type: LOAD_REMINDERS,
        reminders: response.reminders,
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

  clickOnEditHandler(petnote) {
    const { dispatch, history } = this.props;
    dispatch({ type: SELECT_REMINDER, reminder: petnote });
    history.replace("/pet/records/petnotes/update");
  }

  async handlePetNoteCreation(petnote) {
    const { history, dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");
    try {
      dispatch({ type: REQUEST_SENT });
      await createPetNote(petId, petnote);
      dispatch({ type: ADDED_REMINDER });
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: "PetNote was successfully added",
        },
      });
      history.replace("/pet/records/petnotes");
      await this.fetchPetNotes();
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

  async handlePetNoteUpdate(petnote) {
    const [, petnoteId] = petnote.record.split("/");
    const { history, dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");

    try {
      dispatch({ type: REQUEST_SENT });
      await updatePetNote(petId, petnoteId, petnote);
      dispatch({ type: UPDATED_REMINDER });
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: "PetNote was successfully updated",
        },
      });
      history.replace("/pet/records/petnotes");
      await this.fetchPetNotes();
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

  async handlePetNoteDeletion(petnote) {
    const [, petnoteId] = petnote.record.split("/");
    const { history, dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");

    try {
      dispatch({ type: REQUEST_SENT });
      await deletePetNote(petId, petnoteId);
      dispatch({ type: DELETED_REMINDER });
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: "PetNote was successfully deleted",
        },
      });
      history.replace("/pet/records/petnotes");
      await this.fetchPetNotes();
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
    const { loading, user, selectedPetNote, petnotes } = this.props;

    return (
      <React.Fragment>
        <Switch>
          <PrivateRoute exact path="/pet/records/petnotes">
            <PetNoteCards
              petnotes={petnotes}
              clickOnEditHandler={this.clickOnEditHandler.bind(this)}
              clickOnDeleteHandler={this.handlePetNoteDeletion.bind(this)}
            />
          </PrivateRoute>
          <PrivateRoute exact path="/pet/records/petnotes/add">
            <PetNoteForm
              formHandler={this.handlePetNoteCreation.bind(this)}
              loading={loading}
            />
          </PrivateRoute>
          <PrivateRoute exact path="/pet/records/petnotes/update">
            <PetNoteForm
              petnote={selectedPetNote}
              formHandler={this.handlePetNoteUpdate.bind(this)}
              loading={loading}
            />
          </PrivateRoute>
        </Switch>
      </React.Fragment>
    );
  }
}

PetNotes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  selectedPetNote: PropTypes.object,
  petnotes: PropTypes.array,
  selectedPet: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading } = state.app;
  const {
    selectedReminder: selectedPetNote,
    reminders: petnotes,
  } = state.reminders;
  const { selectedPet } = state.pets;
  return { loading, selectedPetNote, petnotes, selectedPet };
}

export default connect(mapStateToProps)(withRouter(PetNotes));
