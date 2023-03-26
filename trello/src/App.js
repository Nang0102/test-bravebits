import BoardContent from "components/boardContent/boardContent";
// import BoardContent from "components/boardContent/index";
import React from "react";
import "./App.scss";
// import Board from "./board/Board";

function MainScreen() {
  return (
    <div className="main-screen">
      {/* <Board/> */}
      <BoardContent columnId="myColumnId" />
      {/* <Board/> */}
    </div>
  );
}

export default MainScreen;
