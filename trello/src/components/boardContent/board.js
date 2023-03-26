const [isDragging, setIsDragging] = useState();

const containerRef = useRef();

function dragStart(e, index) {
  setIsDragging(index);
  console.log(" dragStart ");

  const container = containerRef.current;
  const items = [...container.childrenNodes];
  const draggingItem = items[index];
  const itemsBelowDragItem = items.slice(index + 1);
  const notDragItems = items.filter((_, i) => i !== index);
  const dragData = Data[index];
  let newData = [...data];

  const dragBoundingRect = dragItem.getBoundingRect();

  const space =
    items[1].getBoundingRect().top - items[0].getBoundingRect().bottom;

  dragItem.style.position = "fixed";
  dragItem.style.zIndex = 5000;
  dragItem.style.width = dragBounding.width + "px";
  dragItem.style.height = dragBounding.height + "px";
  dragItem.style.top = dragBounding.top + "px";
  dragItem.style.left = dragBounding.left + "px";
  dragItem.style.cursor = "grabbing";

  console.log("container", container);

  // tajo the div moi de khi thay the cho the div  cu
  const div = document.createElement("div");
  div.id = " div-temp";
  div.style.width = dragBounding.width + "px";
  div.style.height = dragBounding.height + "px";
  div.style.pointerEvents = "none";
  container.appendChild(div);

  const distance = dragBounding.height + space;

  itemsBelowDragItem.forEach((item) => {
    item.style.transform = `translateY( ${distance}px)`;
  });

  let x = e.clientX;
  let y = clientY;

  document.onpointermove = dragMove;

  function dragMove(e) {
    const posX = e.clientX - x;
    const posY = e.clientY - y;

    dragItem.style.transform = ` translate( $(posX)px,  $(posY)px )`;
  }

  const rect1 = dragItem.getBoundingClientRect();
  const rect2 = item.getBoundingClientRect();

  let isOverlapping =
    rect1.y < rect2.y + rect2.height / 2 &&
    rect1.y + rect1.height / 2 > rect2.y;

  if (isOverlapping) {
    //swap position card
    if (item.getAttribute("style")) {
      item.style.transform = "";
      index++;
    } else {
      item.style.transform = `translate( $(distance)px )`;
      index--;
    }
    // swap data
    newData = data.filter((item) => item.id !== dragData.id);
    newData.splice(index, 0, dragData);
  }

  document.opointerup = dragEnd;
  function dragEnd() {
    document.opointerup = "";
    document.onpointermove = "";
    setIsDragging(undefined);
    dragItem.style = "";

    container.removeChildren(div);

    items.forEach((item) => (item.style = ""));
    setData(newData);
  }
}

return;
<div className="board-contents" ref={containerRef}>
  //
  {columns.map((column, id) => {
    return (
      <Column
        key={id}
        column={column}
        onDragStart={(e) => handleDragStart(e, index)}
        // className =  `card ${isDragging === index ? 'dragging' : '' }`
      />
    );
  })}
</div>;

// ???/////////////////////////////
// theem css:
// .caontainer .dragging {
// pointer-events: none;
// touch-action: none;
// -ms-touch-action: none;
// box-shadow: 2px 20px 30px rgba(0,0,0,0.2)
// }
