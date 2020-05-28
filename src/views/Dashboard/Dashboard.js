import React from "react";
import "./Dashboard.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import PetCard from "../../components/Pets/PetCard";
import { getPets } from "../../services/api";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
  LOAD_PETS,
  SELECT_PET,
} from "../../store/actions";

class Dashboard extends React.Component {
  async componentDidMount() {
    const { dispatch, pets } = this.props;

    if (pets.length) return;

    if (this)
      try {
        dispatch({ type: REQUEST_SENT });
        const response = await getPets();
        dispatch({ type: LOAD_PETS, pets: response.pets, next: response.next });
      } catch (e) {
        console.log(e.message);
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

  selectHandler(pet) {
    const { dispatch, history } = this.props;
    dispatch({ type: SELECT_PET, pet });
    history.replace("/pet/records/profile");
  }

  render() {
    const { loading, user, pets } = this.props;
    const petCards = pets.map((pet, index) => (
      <PetCard
        pet={pet}
        key={index}
        selectHandler={this.selectHandler.bind(this)}
      />
    ));
    return (
      <React.Fragment>
        <div className="flex justify-center p-3 kt_dashboard_banner">
          <div className="text-white text-center">
            <p className="text-4xl font-bold">Welcome ! </p>
            <p className="text-3xl font-semibold">
              {user.attributes.given_name}
            </p>
            <img
              className="w-40 h-40 rounded-full mx-auto mt-5"
              src="https://media1.tenor.com/images/a403ab437cabe6b1d988cd7a74ffa046/tenor.gif?itemid=14477191"
              alt="Hello"
            ></img>
          </div>
        </div>
        <div className="flex justify-center px-6 py-6">{petCards}</div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  pets: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading, user } = state.app;
  const { pets } = state.pets;
  return { loading, user, pets };
}

export default connect(mapStateToProps)(withRouter(Dashboard));
