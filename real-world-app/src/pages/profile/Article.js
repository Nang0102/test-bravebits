import React from "react";
import { Link } from "react-router-dom";
import FavoriteBtn from "./FavoriteBtn";

function Article({ article, isLoading }) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/${article.author.username}`}>
          <img src={article.author.image} alt="" />
        </Link>
        <div className="info">
          <Link to={`/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article?.createdAt).toLocaleDateString()}
          </span>
        </div>

        <FavoriteBtn
          favorited={article.favorited}
          favoritesCount={article.favoritesCount}
          slug={article.slug}
          isLoading={isLoading}
        />
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag, index) => {
            return (
              <li className="tag-default tag-pill tag-outline" key={index}>
                {tag}
              </li>
            );
          })}
        </ul>
      </Link>
    </div>
  );
}

export default Article;
