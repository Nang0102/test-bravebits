import React from "react";
import { Link } from "react-router-dom";
import FavoriteBtn from "./FavoriteBtn";

function Article({ article }) {
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
        {/* /////////// */}
        {/* <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> 29
        </button> */}
        <FavoriteBtn
          favorited={article.favorited}
          favoritesCount={article.favoritesCount}
          slug={article.slug}
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
