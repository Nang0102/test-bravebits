import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FavoriteArticleBtn = ({
  favoritesCount,
  isFavorite,
  handleFavorite,
  isLoading,
}) => {
  const user = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log("user", user);

  return (
    <button
      id="like-btn"
      disabled={isLoading}
      className={
        isFavorite
          ? "btn btn-primary btn-sm pull-xs-right"
          : "btn btn-outline-primary btn-sm pull-xs-right"
      }
      onClick={() => {
        if (user) {
          handleFavorite();
        } else {
          navigate("/login");
        }
      }}
    >
      <i className="ion-heart" /> Favourite Article ({favoritesCount})
    </button>
  );
};

export default FavoriteArticleBtn;
