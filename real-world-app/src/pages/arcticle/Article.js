import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import "../../App.css";
import ArticleAuthor from "./ArticleAuthor";
import ArticleComment from "./ArticleComment";
import ArticleAuthorControl from "./ArticleAuthorControl";
import {
  followUser,
  getDataDetail,
  unFollowUser,
  addFavorite,
  deleteFavorite,
  getComment,
  createComment,
  deleteComment,
} from "actions/HttpsRequest";
import { useAuthContext } from "store";
import InputComment from "./InputComment";

function Articles() {
  const params = useParams();
  const [dataArticle, setDataArticle] = useState(null);
  const { state } = useAuthContext();
  const { user } = state;
  const [follow, setFollow] = useState();
  const [isFavorite, setIsFavorite] = useState(null);
  const [countFavorite, setCountFavorite] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listComments, setListComments] = useState(null);
  console.log("listComment", listComments);

  useEffect(() => {
    getDataDetail(params.slug)
      .then((data) => {
        console.log("data-slug-article", data);
        setDataArticle(data.article);
        setIsFavorite(data.article.favorited);
        setCountFavorite(data.article.favoritesCount);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFollow = useCallback(() => {
    if (follow) {
      unFollowUser(dataArticle?.author?.username)
        .then(() => {
          setFollow(!follow);
        })
        .catch((err) => {
          console.log(err);
          setFollow(follow);
        });
    } else {
      followUser(dataArticle?.author?.username)
        .then(() => {
          setFollow(!follow);
        })
        .catch((err) => {
          console.log(err);
          setFollow(follow);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [follow]);

  const handleFavorite = useCallback(() => {
    if (!isFavorite) {
      setIsLoading(true);
      addFavorite(params.slug)
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
      deleteFavorite(params.slug)
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
  }, [countFavorite, isFavorite]);

  useEffect(() => {
    getComment(params.slug)
      .then((data) => {
        console.log("data.comments", data);
        setListComments(data.comments);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleComment = (newComment) => {
    if (newComment.trim() !== "") {
      createComment(params.slug, {
        comment: { body: newComment },
      })
        .then((data) => {
          const newListComments = [...listComments, data.comment];
          setListComments(newListComments);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleDeleteComment = (id) => {
    deleteComment(params.slug, id)
      .then(() => {
        const indexComment = listComments.findIndex(
          (comment) => comment.id === id
        );
        const newListComments = [...listComments];
        newListComments.splice(indexComment, 1);
        setListComments(newListComments);
      })
      .catch((err) => console.log(err));
  };

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
                  isFavorite={isFavorite}
                  countFavorite={countFavorite}
                  follow={follow}
                  handleFollow={handleFollow}
                  handleFavorite={handleFavorite}
                  isLoading={isLoading}
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
                  isFavorite={isFavorite}
                  countFavorite={countFavorite}
                  follow={follow}
                  handleFollow={handleFollow}
                  handleFavorite={handleFavorite}
                  isLoading={isLoading}
                />
              )}
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                {user ? (
                  <InputComment
                    imageUser={dataArticle.author.image}
                    username={dataArticle.author.username}
                    handleComment={handleComment}
                  />
                ) : (
                  <p>
                    <Link to="/login">Sign in</Link> or
                    <Link to="/register">Sign up</Link> to add comments on this
                    article.
                  </p>
                )}

                {listComments &&
                  listComments.map((comment, index) => (
                    <ArticleComment
                      author={dataArticle.author.username}
                      comment={comment}
                      key={index}
                      handleDeleteComment={handleDeleteComment}
                    />
                  ))}
              </div>
            </div>
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
