// Đường dẫn của tệp header.html và footer.html
const headerPath = "./header/Header.html";
const contentPath = "./shoes-container/index.html";

// Lấy phần tử chứa header và footer trong tệp index.html
const headerElement = document.getElementById("header");
const contentElement = document.getElementById("content");

// Đọc nội dung từ tệp header.html và gán vào phần tử header
fetch(headerPath)
  .then((response) => response.text())
  .then((content) => {
    headerElement.innerHTML = content;
  });

// Đọc nội dung từ tệp footer.html và gán vào phần tử footer
fetch(contentPath)
  .then((response) => response.text())
  .then((content) => {
    contentElement.innerHTML = content;
  });
