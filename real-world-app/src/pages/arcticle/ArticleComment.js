import React from "react";
import { Link } from "react-router-dom";

function ArticleComment(props) {
  const { author } = props;
  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        <form className="card comment-form">
          <div className="card-block">
            <textarea
              className="form-control"
              placeholder="Write a comment..."
              rows="3"
            ></textarea>
          </div>
          <div className="card-footer">
            <img alt="" src={author.image} className="comment-author-img" />
            <button className="btn btn-sm btn-primary">Post Comment</button>
          </div>
        </form>

        <div className="card">
          <div className="card-block">
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
          </div>
          <div className="card-footer">
            <Link to="" className="comment-author">
              <img
                alt=""
                src="http://i.imgur.com/Qr71crq.jpg"
                className="comment-author-img"
              />
            </Link>
            &nbsp;
            <Link to="" className="comment-author">
              Jacob Schmidt
            </Link>
            <span className="date-posted">Dec 29th</span>
          </div>
        </div>

        {/* <div className="card">
          <div className="card-block">
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
          </div>
          <div className="card-footer">
            <Link to="" className="comment-author">
              <img
                alt=""
                src="http://i.imgur.com/Qr71crq.jpg"
                className="comment-author-img"
              />
            </Link>
            &nbsp;
            <Link to="" className="comment-author">
              Jacob Schmidt
            </Link>
            <span className="date-posted">Dec 29th</span>
            <span className="mod-options">
              <i className="ion-edit"></i>
              <i className="ion-trash-a"></i>
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ArticleComment;
