import FavoriteArticleBtn from "components/favorite/FavoriteArticleBtn";
import FollowBtn from "pages/profile/FollowBtn";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";

function ArticleAuthor(props) {
  const {
    author,
    isFavorite,
    countFavorite,
    slug,
    createdAt,
    follow,
    handleFollow,
    handleFavorite,
    isLoading,
  } = props;

  return (
    <div className="article-meta">
      <Link to={`/${author.username}`}>
        <img alt="" src={author.image} />
      </Link>
      <div className="info">
        <Link to={`/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">{new Date(createdAt).toLocaleDateString()}</span>
      </div>

      <FollowBtn
        isFollowing={follow}
        username={author.username}
        handleFollow={handleFollow}
      />

      <FavoriteArticleBtn
        isFavorited={isFavorite}
        favoritesCount={countFavorite}
        slug={slug}
        handleFavorite={handleFavorite}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ArticleAuthor;
