import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

import {
  fetchArticle,
  fetchArticleFeed,
  fetchArticleByTag,
  fetchTags,
} from "../../actions/HttpsRequest";
import { useAuthContext } from "store";
import Article from "pages/profile/Article";
import { PAGE_SIZE } from "actions/Constant";
function Home() {
  const [tags, setTags] = useState(null);
  const [listArticle, setListArticle] = useState(null);
  const [currentTag, setCurrentTag] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [currentTab, setCurrentTab] = useState("your-feed");

  const { state } = useAuthContext();
  const { isAuthenticated, user } = state;
  console.log("currentTag", currentTag);

  const handleSelectTag = (e, tag) => {
    e.preventDefault();
    setCurrentTag(tag);
    setCurrentPage(0);
  };
  useEffect(() => {
    if (currentTab === "your-feed") {
      fetchArticleFeed({
        limit: 10,
        offset: 0,
      })
        .then((data) => {
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
    } else if (currentTag !== "") {
      console.log("currentTag-----", currentTag);
      fetchArticleByTag({
        tag: currentTag,
        limit: 10,
        offset: 0,
      })
        .then((data) => {
          console.log("data-----tag", data);
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
    } else {
      fetchArticle().then((data) => {
        const dataSize = data.articles.length;
        const totalPage = Math.ceil(dataSize / PAGE_SIZE);
        console.log("totalPage", totalPage);
        const articlesInPage = data.articles.slice(
          currentPage * PAGE_SIZE,
          (currentPage + 1) * PAGE_SIZE
        );
        setListArticle(articlesInPage);
        setTotalPage(totalPage);
      });
    }
  }, [currentTab, currentPage, isAuthenticated, currentTag]);

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
                {/* {currentTag !== "" ? (
                  <li className="nav-item">
                    <Link to="#" className={"nav-link active"}>
                      <i className="ion-pound"></i>
                      {currentTag}
                    </Link>
                  </li>
                ) : (
                  ""
                )} */}

                {currentTag !== "" ? (
                  <li className="nav-item">
                    <Link to="#" className={"nav-link active"}>
                      <i className="ion-pound"></i>
                      {JSON.stringify(currentTag)}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
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

            <ul className="pagination">
              {/* {totalPage &&
              totalPage.map((page, index) => { */}
              {totalPage && totalPage !== 0
                ? new Array(totalPage).fill(null).map((page, index) => {
                    return (
                      <li
                        className={
                          currentPage === index
                            ? "page-item ng-scope active"
                            : "page-item ng-scope"
                        }
                        key={index}
                        onClick={() => setCurrentPage(index)}
                      >
                        <Link to="#" className="page-link ng-binding">
                          {index + 1}
                        </Link>
                      </li>
                    );
                  })
                : ""}
            </ul>
          </div>

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
                        to="#"
                        className="tag-pill tag-default"
                        onClick={(e) => handleSelectTag(e, tag)}
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
