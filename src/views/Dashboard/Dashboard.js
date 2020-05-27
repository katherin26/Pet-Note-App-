import React from "react";
import "./Dashboard.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
} from "../../store/actions";

class Dashboard extends React.Component {
  render() {
    const { loading, user } = this.props;
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
        <div className="flex justify-center px-6 py-6">
          <div className="kt_container_card mx-6">
            <div className="kt_profile_card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTyh9RN_zqCyVLtyMLck56fHrPUbJMreylVa2pfUHUMGUCeqnZt&usqp=CAU"
                alt="image1"
                className="profile-icon"
              />
              <div className="kt_profile_card_name">Pet name</div>
              <a href="#" className="button_card">
                Profile
              </a>
            </div>
          </div>
          <div className="kt_container_card mx-6">
            <div className="kt_profile_card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTyh9RN_zqCyVLtyMLck56fHrPUbJMreylVa2pfUHUMGUCeqnZt&usqp=CAU"
                alt="image1"
                className="profile-icon"
              />
              <div className="kt_profile_card_name">Pet name</div>
              <a href="#" className="button_card">
                Profile
              </a>
            </div>
          </div>
          <div className="kt_container_card mx-6">
            <div className="kt_profile_card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTyh9RN_zqCyVLtyMLck56fHrPUbJMreylVa2pfUHUMGUCeqnZt&usqp=CAU"
                alt="image1"
                className="profile-icon"
              />
              <div className="kt_profile_card_name">Pet name</div>
              <a href="#" className="button_card">
                Profile
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading, user } = state.app;
  return { loading, user };
}

export default connect(mapStateToProps)(withRouter(Dashboard));
