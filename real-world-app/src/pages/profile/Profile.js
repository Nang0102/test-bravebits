import {
  fetchArticleByUser,
  fetchFavoritedArticle,
  fetchProfiles,
  followUser,
  unFollowUser,
  fetchUser,
} from "actions/HttpsRequest";
import Article from "./Article";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "store";
import "../../App.css";
import FollowBtn from "./FollowBtn";
// import { normalizeUsername } from "components/nomalize-username/NomalizeUserName";

function Profile() {
  const { profile } = useParams();
  const [author, setAuthor] = useState(null);
  const [listArticle, setListArticle] = useState(null);
  const [currentTab, setCurrentTab] = useState("my-article");
  const [follow, setFollow] = useState(false);

  // const { state } = useAuthContext();
  // const { user } = state;
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser(token)
      .then((data) => {
        console.log("uuuu", data);
        setUser(data.user);
        // setBio(data.user.bio);
        // setEmail(data.user.email);
        // setUserName(data.user.username);
        // setImageURL(data.user.image);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentTab === "my-article") {
      fetchProfiles(profile).then((data) => {
        setAuthor(data.profile);
        setFollow(data.profile.following);
        // const userData = data.profile.username.replaceAll(" ", "+")
        const userData = data.profile.username;
        // const userData = normalizeUsername(data.profile.username);
        console.log("userData", userData);
        fetchArticleByUser({ author: userData })
          .then((data) => {
            // console.log("data-art-pr", data.articles);
            setListArticle(data.articles);
          })
          .catch((err) => console.log(err));
      });
    } else if (currentTab === "favorited-article") {
      fetchProfiles(profile)
        .then((data) => {
          console.log("-----", data.profile);
          setAuthor(data.profile);

          // const userData = normalizeUsername(data.profile.username);
          const userData = data.profile.username;

          fetchFavoritedArticle({
            author: userData,
          })
            .then((data) => {
              setListArticle(data.articles);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [currentTab, follow]);

  const handleFollow = useCallback(() => {
    if (follow) {
      unFollowUser(author?.username)
        .then(() => {
          setFollow(!follow);
        })
        .catch((err) => {
          console.log(err);
          setFollow(follow);
        });
    } else {
      followUser(author?.username)
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
                      isFollowing={follow}
                      username={author.username}
                      handleFollow={handleFollow}
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
