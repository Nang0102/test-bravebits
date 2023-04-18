import FavoriteBtn from "pages/profile/FavoriteBtn";
import FollowBtn from "pages/profile/FollowBtn";
import React from "react";
import { Link } from "react-router-dom";

function ArticleAuthor(props) {
  const { author, favorited, countFavorite, slug, createdAt, handleFollow } =
    props;
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
        isFollowing={author.following}
        username={author.username}
        handleFollow={handleFollow}
      />

      <FavoriteBtn
        favorited={favorited}
        favoritesCount={countFavorite}
        slug={slug}
      />
    </div>
  );
}

export default ArticleAuthor;
