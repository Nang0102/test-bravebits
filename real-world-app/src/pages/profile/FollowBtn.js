import React from "react";
import { useNavigate } from "react-router-dom";

const FollowBtn = ({ isFollowing, username, handleFollow }) => {
  const user = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-sm btn-outline-secondary action-btn"
      onClick={() => {
        if (user) {
          //   handleFollow();
        } else {
          navigate("/login");
        }
      }}
    >
      <i className="ion-plus-round" />
      &nbsp; {isFollowing ? "Unfollowing" : "Following"} {username}
    </button>
  );
};

export default FollowBtn;
