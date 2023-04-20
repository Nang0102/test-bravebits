import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../App.css";
import InputTitleArticle from "./InputTitleArticle";
import InputAboutArticle from "./InputAboutArticlle";
import InputContent from "./InputContent";
import InputTag from "./InputTag";
import {
  createArticle,
  getDataDetail,
  updateArticle,
} from "actions/HttpsRequest";

function EditArticle() {
  const [dataArticle, setDataArticle] = useState();
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [content, setContent] = useState("");
  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getDataDetail(params.slug)
      .then((data) => {
        if (data.article === undefined) {
          setIsUpdate(false);
        } else {
          setIsUpdate(true);
        }
        setDataArticle(data.article);
        setTitle(data.article.title);
        setAbout(data.article.description);
        setContent(data.article.body);
        setTags(data.article.tagList);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddTag = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (tags && tags.slice(-1).toString() !== inputTag && inputTag !== "")
          setTags([...tags, inputTag]);
        setInputTag("");
      }
    },
    [inputTag, tags]
  );

  const handleDeleteTag = (tag) => {
    const newTags = [...tags];
    const index = newTags.findIndex((tagItem) => tagItem === tag);
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleSubmitArticle = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setErrors("title can't be blank");
    } else if (about.trim() === "") {
      setErrors("description can't be blank");
    } else if (content === "") {
      setErrors("body can't be blank");
    } else {
      const newArticle = {
        title: title,
        description: about,
        body: content,
        tagList: tags,
      };

      if (!isUpdate) {
        createArticle({
          article: newArticle,
        })
          .then((data) => {
            const slug = data.article.slug;
            navigate(`/article/${slug}`);
            setTitle("");
            setAbout("");
            setContent("");
            setIsUpdate(false);
            setInputTag("");
            setTags(null);
            setErrors(null);
          })
          .catch((err) => console.log(err));
      } else {
        updateArticle(params.slug, { article: newArticle }).then((data) => {
          const slug = data.article.slug;
          navigate(`/article/${slug}`);
          setTitle("");
          setAbout("");
          setContent("");
          setIsUpdate(true);
          setInputTag("");
          setTags(null);
          setErrors(null);
        });
      }
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset>
                <InputTitleArticle title={title} setTitle={setTitle} />
                <InputAboutArticle about={about} setAbout={setAbout} />
                <InputContent content={content} setContent={setContent} />
                <fieldset className="form-group">
                  <InputTag
                    inputTag={inputTag}
                    setInputTag={setInputTag}
                    handleAddTag={handleAddTag}
                  />
                  <div className="tag-list">
                    {tags &&
                      tags.length !== 0 &&
                      tags.map((tag, index) => {
                        return (
                          <span
                            key={index}
                            className="tag-default tag-pill ng-binding ng-scope"
                          >
                            <i
                              className="ion-close-round"
                              onClick={handleDeleteTag}
                            />
                            {tag}
                          </span>
                        );
                      })}
                  </div>
                </fieldset>

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  onClick={handleSubmitArticle}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditArticle;
