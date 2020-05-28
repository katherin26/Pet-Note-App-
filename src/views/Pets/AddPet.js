import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createPet } from "../../services/api";
import PetForm from "../../components/Pets/PetForm";
import { withRouter } from "react-router-dom";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
  ADDED_PET,
} from "../../store/actions";

class AddPet extends React.Component {
  async handleFormSubmit(pet) {
    const { history, dispatch } = this.props;

    try {
      dispatch({ type: REQUEST_SENT });
      await createPet(pet);
      dispatch({ type: ADDED_PET });
      dispatch({
        type: NOTIFY_USER,
        notification: { type: "error", message: "Pet was successfully added" },
      });
      history.replace("/dashboard");
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

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="">
        <PetForm
          formHandler={this.handleFormSubmit.bind(this)}
          loading={loading}
        />
      </div>
    );
  }
}

AddPet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading } = state.app;
  return { loading };
}

export default connect(mapStateToProps)(withRouter(AddPet));
