// import React, { memo } from "react";

// const InputImage = memo(({ imgUrl, setImgUrl }) => {
//   return (
//     <fieldset className="form-group">
//       <input
//         value={imgUrl}
//         onChange={(e) => {
//           setImgUrl(e.target.value);
//         }}
//         className="form-control"
//         type="text"
//         placeholder="URL of profile picture"
//       />
//     </fieldset>
//   );
// });

// export default InputImage;

import React, { memo } from "react";

const InputImage = memo(({ imageURL, setImageURL }) => {
  return (
    <fieldset className="form-group">
      <input
        value={imageURL}
        onChange={(e) => {
          setImageURL(e.target.value);
        }}
        className="form-control"
        type="text"
        placeholder="URL of profile picture"
      />
    </fieldset>
  );
});

export default InputImage;
