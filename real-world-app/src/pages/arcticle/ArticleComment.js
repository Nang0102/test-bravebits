import React, { memo } from "react";
import { Link } from "react-router-dom";

const ArticleComment = memo(({ comment, handleDeleteComment }) => {
  console.log("comment",comment);
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment?.body}</p>
      </div>
      <div className="card-footer">
        <Link className="comment-author">
          <img
            src={comment?.author.image}
            alt={comment?.author.username}
            className="comment-author-img"
          />
        </Link>
        &nbsp;
        <Link className="comment-author" to={`/${comment?.author?.username}`}>
          {comment?.author?.username}
        </Link>
        <span className="date-posted">
          {new Date(comment?.createdAt).toLocaleDateString()}
        </span>
        <span className="mod-options">
          <i
            className="ion-trash-a"
            onClick={() => {
              const isDelete = window.confirm(
                "Are you sure delete this comment"
              );
              if (isDelete) {
                handleDeleteComment(comment?.id);
              }
            }}
          />
        </span>
      </div>
    </div>
  );
});

export default ArticleComment;
