import { addFavorite, deleteFavorite } from "actions/HttpsRequest";
import React, { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FavoriteBtn = memo((props) => {
  const { favorited, favoritesCount, slug } = props;

  const [isFavorite, setIsFavorite] = useState(null);
  const [countFavorite, setCountFavorite] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(favorited);
    setCountFavorite(favoritesCount);
  }, [favoritesCount, favorited]);

  const handleFavorite = () => {
    if (!isFavorite) {
      setIsLoading(true);

      addFavorite(slug)
        .then(() => {
          setIsFavorite(true);
          setCountFavorite((prev) => prev + 1);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsFavorite(false);
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);

      deleteFavorite(slug)
        .then(() => {
          setIsFavorite(false);
          setCountFavorite((prev) => prev - 1);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsFavorite(true);
          setIsLoading(false);
        });
      setIsFavorite(!isFavorite);
    }
  };
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
      <i className="ion-heart"></i> {countFavorite}
    </button>
  );
});

export default memo(FavoriteBtn);
