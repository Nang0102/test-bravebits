import { addFavorite, deleteFavorite } from "actions/HttpsRequest";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FavoriteBtn(props) {
  const { favorited, favoritesCount, slug } = props;

  const [isFavorite, setIsFavorite] = useState(null);
  const [countFavorite, setCountFavorite] = useState(null);
  const user = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(favorited);
    setCountFavorite(favoritesCount);
  }, [favoritesCount, favorited]);

  const handleFavorite = () => {
    if (!isFavorite) {
      addFavorite(slug)
        .then(() => {
          setIsFavorite(true);
          setCountFavorite((prev) => prev + 1);
        })
        .catch((err) => {
          console.log(err);
          setIsFavorite(false);
        });
    } else {
      deleteFavorite(slug)
        .then(() => {
          setIsFavorite(false);
          setCountFavorite((prev) => prev - 1);
        })
        .catch((err) => {
          console.log(err);
          setIsFavorite(true);
        });
      setIsFavorite(!isFavorite);
    }
  };
  return (
    <button
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
      <i className="ion-heart"></i> {countFavorite}
    </button>
  );
}

export default FavoriteBtn;
