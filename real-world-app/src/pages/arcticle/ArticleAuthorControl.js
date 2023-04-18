import { deleteArticle } from "actions/HttpsRequest";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ArticleAuthorControl(props) {
  const { author, createdAt, slug, title } = props;
  const navigate = useNavigate();

  const handleDeleteArticle = () => {
    console.log("slug", slug);
    deleteArticle(slug)
      .then(() => {
        navigate(`/`);
      })
      .catch((err) => console.log(err));
  };

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
      <span className="ng-scope">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => {
            navigate(`/editor/${slug}`);
          }}
        >
          <i className="ion-edit"></i>
          &nbsp; Edit Article
        </button>
        &nbsp;&nbsp;
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => {
            if (window.confirm(`Are you sure delete article: ${title} `)) {
              handleDeleteArticle();
            }
          }}
        >
          <i className="ion-trash-a"></i>
          &nbsp; Delete Article
        </button>
      </span>
    </div>
  );
}

export default ArticleAuthorControl;
