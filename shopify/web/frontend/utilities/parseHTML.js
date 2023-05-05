export const parserHTML = (html) => {
  const markedText = (text) => {
    return `<span>${text}</span>`;
  };

  let temptDiv = document.createElement("div");
  let tempt = DOMPurify.sanitize(markedText(html), {
    ALLOWED_TAGS: ["span"],
    ALLOWED_ATTR: ["style"],
  });
  temptDiv.innerHTML = tempt;

  const cleanHTML = (html) => {
    return $("<div>").html(html).text();
  };

  const text = cleanHTML(temptDiv.innerHTML);
  return text;
};
