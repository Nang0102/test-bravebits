import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

import { fetchArticleFeed, fetchTags } from "../../actions/HttpsRequest";
import { useAuthContext } from "store";
import Article from "pages/profile/Article";
import { PAGE_SIZE } from "actions/Constant";
function Home() {
  const [tags, setTags] = useState(null);
  const [listArticle, setListArticle] = useState(null);
  const [selectTag, setSelectTag] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [currentTab, setCurrentTab] = useState("your-feed");

  const { state } = useAuthContext();
  const { isAuthenticated, user } = state;
  console.log("isAuthenticated", isAuthenticated);
  console.log("listArticle", listArticle);

  useEffect(() => {
    if (currentTab === "your-feed") {
      fetchArticleFeed({
        limit: 10,
        offset: 0,
      })
        .then((data) => {
          console.log("data-feed", data);
          const dataSize = data.articles.length;
          const totalPage = Math.ceil(dataSize / PAGE_SIZE);
          const articlesInPage = data.articles.slice(
            currentPage * PAGE_SIZE,
            (currentPage + 1) * PAGE_SIZE
          );
          setListArticle(articlesInPage);
          setTotalPage(totalPage);
        })
        .catch((err) => console.log(err));
    }
  }, [currentTab, currentPage, isAuthenticated, selectTag]);

  useEffect(() => {
    fetchTags()
      .then((data) => {
        setTags(data.tags);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {isAuthenticated ? (
                  <li className="nav-item">
                    <Link
                      to="#"
                      className={
                        currentTab === "your-feed"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      onClick={() => {
                        setCurrentTab("your-feed");
                      }}
                    >
                      Your Feed
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <li className="nav-item">
                  <Link
                    to="#"
                    className={
                      currentTab === "global-feed"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      setCurrentTab("global-feed");
                    }}
                  >
                    Global Feed
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

          <ul className="pagination">
            {totalPage &&
              totalPage.map((page, index) => {
                return (
                  <li key={index}>
                    <Link>{page}</Link>
                  </li>
                );
              })}
          </ul>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags === null ? (
                  <div className="article-preview">Loading...</div>
                ) : tags.length !== 0 ? (
                  tags.map((tag, index) => {
                    return (
                      <Link
                        key={index}
                        to=""
                        className="tag-pill tag-default"
                        onClick={() => {
                          setCurrentTab("");
                        }}
                      >
                        {tag}
                      </Link>
                    );
                  })
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
