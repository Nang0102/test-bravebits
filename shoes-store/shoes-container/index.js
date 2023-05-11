function changeLargeImage(image) {
  const newSource = image.src;
  const largeImage = document.getElementById("large-image");
  largeImage.src = newSource;
}

// Đường dẫn của tệp header.html và footer.html
const investmentPath = "../investment/investment.html";
const contentPath = "./shoes-container/index.html";

// Lấy phần tử chứa header và footer trong tệp index.html
const investmentElement = document.getElementById("investment");
const contentElement = document.getElementById("content");

// Đọc nội dung từ tệp header.html và gán vào phần tử header
fetch(investmentPath)
  .then((response) => response.text())
  .then((content) => {
    investmentElement.innerHTML = content;
  });

// Đọc nội dung từ tệp footer.html và gán vào phần tử footer
fetch(contentPath)
  .then((response) => response.text())
  .then((content) => {
    contentElement.innerHTML = content;
  });
