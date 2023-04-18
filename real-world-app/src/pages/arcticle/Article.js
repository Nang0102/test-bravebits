import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import "../../App.css";
import ArticleAuthor from "./ArticleAuthor";
import ArticleComment from "./ArticleComment";
import ArticleAuthorControl from "./ArticleAuthorControl";
import { followUser, getDataDetail, unFollowUser } from "actions/HttpsRequest";
import { useAuthContext } from "store";

function Articles() {
  const params = useParams();
  const [dataArticle, setDataArticle] = useState(null);
  const { state } = useAuthContext();
  const { user } = state;
  const [follow, setFollow] = useState();
  const [favourite, setFavourite] = useState();
  const [countFavorite, setCountFavorite] = useState();
  const [listComments, setListComments] = useState(null);

  useEffect(() => {
    getDataDetail(params.slug)
      .then((data) => {
        console.log("data-slug-article", data);
        setDataArticle(data.article);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFollow = useCallback(() => {
    if (follow) {
      unFollowUser(dataArticle?.author?.username)
        .then(() => {
          console.log("follow", follow);

          setFollow(!follow);
        })
        .catch((err) => {
          console.log(err);
          setFollow(follow);
        });
    } else {
      followUser(dataArticle?.author?.username)
        .then(() => {
          console.log("-----Unfollow", follow);

          setFollow(!follow);
          console.log("-----Unfollow22222", follow);
        })
        .catch((err) => {
          console.log(err);
          setFollow(follow);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [follow]);
  return (
    <div className="article-page">
      {dataArticle ? (
        <div>
          <div className="banner">
            <div className="container">
              <h1>{dataArticle.title}</h1>
              {(dataArticle.author?.username ?? null) ===
              (user?.username ?? null) ? (
                <ArticleAuthorControl
                  author={dataArticle.author}
                  createdAt={dataArticle.createdAt}
                  title={dataArticle.title}
                  slug={dataArticle.slug}
                />
              ) : (
                <ArticleAuthor
                  author={dataArticle.author}
                  slug={dataArticle.slug}
                  createdAt={dataArticle.createdAt}
                  favourite={dataArticle.favorited}
                  countFavorite={dataArticle.favoritesCount}
                  follow={follow}
                  handleFollow={handleFollow}
                />
              )}
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p> {dataArticle.body}</p>
              </div>
            </div>

            <hr />

            <div className="article-actions">
              {dataArticle &&
              dataArticle.author &&
              user &&
              (dataArticle.author?.username ?? null) ===
                (user?.username ?? null) ? (
                <ArticleAuthorControl
                  author={dataArticle.author}
                  createdAt={dataArticle.createdAt}
                  title={dataArticle.title}
                  slug={dataArticle.slug}
                />
              ) : (
                <ArticleAuthor
                  author={dataArticle.author}
                  slug={dataArticle.slug}
                  createdAt={dataArticle.createdAt}
                  favourite={dataArticle.favorited}
                  countFavorite={dataArticle.favoritesCount}
                  follow={follow}
                  handleFollow={handleFollow}
                />
              )}
            </div>
            <ArticleComment author={dataArticle.author} />
          </div>
        </div>
      ) : (
        <div className="container page">
          <div className="article-preview">Loading...</div>
        </div>
      )}
    </div>
  );
}

export default Articles;
