import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const FollowBtn = memo(({ isFollowing, username, handleFollow }) => {
  const user = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-sm btn-outline-secondary action-btn"
      onClick={() => {
        if (user) {
          handleFollow();
        } else {
          navigate("/login");
        }
      }}
    >
      <i className="ion-plus-round" />
      &nbsp; {isFollowing ? "Unfollow" : "Follow"} {username}
    </button>
  );
});

export default memo(FollowBtn);
