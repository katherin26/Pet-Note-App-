import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createPet } from "../../services/api";
import PetForm from "../../components/Pets/PetForm";
import { withRouter, Link } from "react-router-dom";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
} from "../../store/actions";

class AddPet extends React.Component {
  async handleFormSubmit(pet) {
    console.log("Form submitted");
    console.log(pet);
    const { history, location, dispatch } = this.props;
    const { from } = location.state || { from: { pathname: "/dashboard" } };

    try {
      dispatch({ type: REQUEST_SENT });
      //const user = await logIn(this.state.email, this.state.password);
      //dispatch({ type: LOGIN, user });
      history.replace(from);
    } catch (e) {
      dispatch({
        type: NOTIFY_USER,
        notification: { type: "error", message: e.message },
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
      <div className="mt-8">
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
