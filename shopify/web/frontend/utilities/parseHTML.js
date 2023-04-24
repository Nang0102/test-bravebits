export const parserHTML = (html) => {
  let temptDiv = document.createElement("div");
  let tempt = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  temptDiv.innerHTML = tempt;
  const text = temptDiv.textContent || temptDiv.innerText || "";
  return text;
};
