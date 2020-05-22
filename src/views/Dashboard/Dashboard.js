import React from "react";
import "./Dashboard.css";

export default function Dashboard(props) {
  return (
    <React.Fragment>
      <div className="flex justify-center px-6 py-12 kt_dashboard_banner">
        <div className="text-white text-center">
          <p className="text-4xl font-bold">Welcome Back ! </p>
          <p className="text-3xl font-semibold">Katherin</p>
          <img
            className="w-48 h-48 rounded-full mx-auto mt-8"
            src="https://media1.tenor.com/images/a403ab437cabe6b1d988cd7a74ffa046/tenor.gif?itemid=14477191"
            alt="Hello"
          ></img>
        </div>
      </div>
      <div className="flex justify-center px-6 py-6">
        <div className="kt_container_card mx-6">
          <div className="kt_profile_card">
            <img
              src="https://i.pinimg.com/originals/21/c1/13/21c113e05f1a219989a0b07a03b1577a.jpg"
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
              src="https://i.pinimg.com/originals/21/c1/13/21c113e05f1a219989a0b07a03b1577a.jpg"
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
              src="https://i.pinimg.com/originals/21/c1/13/21c113e05f1a219989a0b07a03b1577a.jpg"
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
