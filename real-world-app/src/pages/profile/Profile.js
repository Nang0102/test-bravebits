import {
  fetchArticleByUser,
  fetchFavoritedArticle,
  fetchProfiles,
} from "actions/HttpsRequest";
import Article from "./Article";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "store";
import "../../App.css";
import FollowBtn from "./FollowBtn";

function Profile(handleFollow) {
  const { profile } = useParams();
  const [author, setAuthor] = useState(null);
  const [listArticle, setListArticle] = useState(null);
  const [currentTab, setCurrentTab] = useState("my-article");
  const { state } = useAuthContext();
  const { user } = state;

  useEffect(() => {
    if (currentTab === "my-article") {
      fetchProfiles(profile).then((data) => {
        setAuthor(data.profile);
        // const userData = data.profile.username.replaceAll(" ", "+")
        const userData = data.profile.username;
        console.log("userData1111", userData);
        fetchArticleByUser({ author: userData })
          .then((data) => {
            setListArticle(data.articles);
          })
          .catch((err) => console.log(err));
      });
    } else if (currentTab === "favorited-article") {
      fetchProfiles(profile)
        .then((data) => {
          setAuthor(data.profile);
          const userData = data.profile.username;
          console.log("userAPI", userData);
          fetchFavoritedArticle({
            author: userData,
          }) //////////////
            .then((data) => {
              setListArticle(data.articles);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [currentTab]);

  return (
    <div>
      {author && (
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img src={author.image} className="user-img" alt="" />
                  <h4>{author.username}</h4>
                  <p>{author.bio}</p>
                  {/* ////////////////// */}
                  {user && user?.username === author?.username ? (
                    <Link
                      to="/setting"
                      className="btn btn-sm btn-outline-secondary action-btn"
                    >
                      <i className="ion-plus-round" />
                      &nbsp; Edit Profile Settings
                    </Link>
                  ) : (
                    <FollowBtn
                      isFollowing={author.following}
                      username={author.username}
                    />
                  )}
                  {/* /////////////////////// */}
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <Link
                        to="#"
                        className={
                          currentTab === "my-article"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={() => {
                          setCurrentTab("my-article");
                        }}
                      >
                        My Articles
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="#"
                        className={
                          currentTab === "favorited-article"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={() => {
                          setCurrentTab("favorited-article");
                        }}
                      >
                        Favorited Articles
                      </Link>
                    </li>
                  </ul>
                </div>

                {listArticle && listArticle.length === 0 ? (
                  <div className="article-preview">
                    No articles are here ... yet
                  </div>
                ) : listArticle === null ? (
                  <div className="article-preview">Loading...</div>
                ) : (
                  <div>
                    {listArticle &&
                      listArticle.map((article, index) => (
                        <Article article={article} key={index} />
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
