import React, { memo, useState } from "react";

const InputComment = memo(({ imageUser, username, handleComment }) => {
  const [inputComment, setInputComment] = useState("");
  const handleInputComment = (e) => {
    setInputComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleComment(inputComment);
    setInputComment("");
  };

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          value={inputComment}
          onChange={handleInputComment}
          className="form-control"
          placeholder="Write a comment..."
          rows={3}
        />
      </div>
      <div className="card-footer ">
        <img src={imageUser} alt={username} className="comment-author-img" />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
});

export default InputComment;
