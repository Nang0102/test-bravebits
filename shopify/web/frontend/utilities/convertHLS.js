/* 
h: hue đại diện cho màu sắc
l: lightness: đại diện cho độ sáng
s: saturation: đại diện cho độ bão hòa
c:  độ sáng tối đa có thể đạt được
x: đại diện cho gia trị  phụ trợ để tính toán các gtri RGB
m: đại diện cho màu đen
padStart(a,b) được sử dụng để thêm ký tự vào đầu chuỗi để đạt độ dài chuỗi mong muốn.
       a: độ dài mong muốn của chuỗi sau khi được thêm ký tự, 
       b: ký tự muốn thêm vào đầu chuỗi.
*/

export function convertHLS(h, l, s) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r, g, b;
  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  // Chuyển đổi các giá trị RGB từ 0-1 sang 0-255
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  // Chuyển đổi thành dạng mã màu Hexadecimal
  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");
  const hexColor = `#${hexR}${hexG}${hexB}`;

  return hexColor;
}
