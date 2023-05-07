import React, { useState, useCallback, useEffect } from "react";
import {
  LegacyCard,
  Text,
  ButtonGroup,
  ActionList,
  Popover,
  Button,
  Tooltip,
  Tabs,
  ColorPicker,
  TextField,
} from "@shopify/polaris";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaOutdent,
  FaIndent,
} from "react-icons/fa";
import { BsTable, BsImage, BsFillCameraVideoFill } from "react-icons/bs";
import { GrClear } from "react-icons/gr";
import { MdOutlineFormatColorText } from "react-icons/md";
import { TypeMinor, EmbedMinor } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
import { convertHLS } from "../utilities/convertHLS";

export function PageContent({ content, editorRef, handleContentChange }) {
  const [activeHeading, setActiveHeading] = useState(false);
  const [activeAlign, setActiveAlign] = useState(false);
  const [activePickColor, setActivePickColor] = useState(false);
  const [activeTable, setActiveTable] = useState(false);
  const [tabColor, setTabColor] = useState(0);
  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });
  const [bgColor, setBgColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  const tabColors = [
    {
      id: "color",
      content: "Text",
      accessibilityLabel: "Text",
      panelID: "Text",
    },
    {
      id: "bgcolor",
      content: "Background",
      accessibilityLabel: "Background",
      panelID: "Background",
    },
  ];

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, []);
  const handleInput = (event) => {
    const content = event.target.innerHTML;
    handleContentChange(content);
  };

  const handleTabChange = useCallback(
    (selectedTabIndex) => setTabColor(selectedTabIndex),
    []
  );

  const [showEditor, setShowEditor] = useState(true);

  const toggleShowEditor = useCallback(
    () => setShowEditor((show) => !show),
    []
  );
  const toggleActiveHeading = useCallback(
    () => setActiveHeading((active) => !active),
    []
  );

  const toggleActiveAlign = useCallback(
    () => setActiveAlign((active) => !active),
    []
  );
  const toggleActivePickColor = useCallback(
    () => setActivePickColor((active) => !active),
    []
  );

  const toggleActiveTable = useCallback(
    () => setActiveTable((active) => !active),
    []
  );
  const activatorHeading = (
    <Button icon={TypeMinor} onClick={toggleActiveHeading} disclosure></Button>
  );
  const activatorAlign = (
    <Button icon={FaAlignLeft} onClick={toggleActiveAlign} disclosure></Button>
  );
  const activatorPickColor = (
    <Button
      icon={MdOutlineFormatColorText}
      onClick={toggleActivePickColor}
      disclosure
    ></Button>
  );

  const activatorTable = (
    <Button icon={BsTable} onClick={toggleActiveTable} disclosure></Button>
  );

  function isActiveBold() {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      var range = selection.getRangeAt(0);
      const elementTag = document.getElementsByTagName("b");
      const parentElement = range.commonAncestorContainer.parentElement;
      var isBold = false;
      console.log("checkTagName", elementTag);
      console.log("parent", parentElement);
      console.log("checkparent", parentElement.getElementsByTagName("b"));
      if (
        elementTag.length !== 0 ||
        parentElement.tagName === "b" ||
        parentElement.style.fontWeight === "bold"
      ) {
        isBold = true;
      }
      console.log("isBold", isBold);
      return isBold;
    }
    // return false;
  }

  function applyBold() {
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const boldElement = document.createElement("b");
      boldElement.appendChild(range.extractContents());
      range.insertNode(boldElement);
      console.log("bold", boldElement);
    }
    editorRef.current.focus();
  }

  function removeBold() {
    console.log("remove");

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      // const parentElement = range.commonAncestorContainer.parentElement;
      const styledElement = document.createElement("span");
      styledElement.style.fontWeight = "normal";

      styledElement.textContent = range.toString();
      range.deleteContents();
      range.insertNode(styledElement);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    editorRef.current.focus();
  }

  // function handleFormat() {
  //   const highlight = window.getSelection();
  //   console.log("parent node element: ", highlight.anchorNode.parentElement);
  //   console.log("parent node: ", highlight.anchorNode.parentNode);
  //   console.log(
  //     "parent node tag name: ",
  //     highlight.anchorNode.parentNode.tagName
  //   );
  //   console.log(
  //     "parent node tag attribute: ",
  //     highlight.anchorNode.parentNode.ATTRIBUTE_NODE
  //   );
  //   const span =
  //     '<span class="bold" style="font-weight: bold">' + highlight + "</span>";

  //   const text = $(".editor-container").html();

  //   // const parent = getSelectionParentElement();
  //   console.log("parent", parent);

  //   if ($(parent).hasClass("bold")) {
  //     console.log("Already bold");
  //     console.log("text: ", text);
  //     console.log("span: ", span);
  //     console.log("highlight: ", highlight);
  //     console.log("latest text: ", text.replace(highlight, span));
  //     $(".editor-container").html(text.replace(span, highlight));
  //   } else {
  //     console.log("Not bold");
  //     console.log("text: ", text);
  //     console.log("span: ", span);
  //     console.log("highlight: ", highlight);
  //     console.log("latest text: ", text.replace(highlight, span));
  //     $(".editor-container").html(text.replace(highlight, span));
  //   }
  // }

  function getSelectionParentElement() {
    var parentEl = null,
      sel;
    if (window.getSelection) {
      sel = window.getSelection();

      // sel.anchorNode.parentNode.ATTRIBUTE_NODE
      if (sel.rangeCount) {
        parentEl = sel.getRangeAt(0).commonAncestorContainer;
        console.log("parentEl", parentEl);
        console.log("parentEl.nodeType", parentEl.nodeType);

        if (parentEl.nodeType != 1) {
          parentEl = parentEl.parentNode;
        }
      }
    }
    return parentEl;
  }

  function clearSelectionFormatting() {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    //
    const styledElement = document.createElement("span");
    console.log("style", style);
    switch (style) {
      case "b":
        styledElement.style.fontWeight = "normal"; // Remove bold style

        break;
      case "i":
        styledElement.style.fontStyle = "normal"; // Remove italic style

      case "u":
        // Remove underline style
        styledElement.style.textDecoration = "none";
        styledElement.style.display = "inline-block";
      default:
        break;
    }

    styledElement.textContent = range.toString();

    range.deleteContents();
    range.insertNode(styledElement);
    // range.ins
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function handleFormat() {
    const selection = window.getSelection();
    if (!selection) {
      return;
    }
    const range = selection.getRangeAt(0);
    if (!range) {
      return;
    }
    console.log("parent node: ", selection.anchorNode.parentNode);
    console.log(
      "parent node tag name: ",
      selection.anchorNode.parentNode.tagName
    );
    if (selection.anchorNode.parentNode.tagName != "SPAN") {
      console.log("bold");
      const styledElement = document.createElement("span");

      styledElement.style.fontWeight = "bold";

      // apply a new style
      styledElement.appendChild(range.extractContents());
      range.insertNode(styledElement);
    } else {
      console.log("========================================");
      const parentNode = selection.anchorNode.parentNode;
      console.log("parent node: ", parentNode);
      let currentParentFontWeight = parentNode.style.fontWeight;
      console.log("current parent font weight: ", currentParentFontWeight);
      const newSpan = document.createElement("span");
      newSpan.textContent = range.toString();

      if (currentParentFontWeight == "bold") {
        newSpan.style.fontWeight = "normal";
        console.log("new bold span", newSpan);
      } else {
        newSpan.style.fontWeight = "bold";
        console.log("new normal span", newSpan);
      }

      range.deleteContents();
      range.insertNode(newSpan);
    }
    deSelectText();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function deSelectText() {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {
      // IE?
      document.selection.empty();
    }
  }

  function handleIndent() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const parentNode = range.commonAncestorContainer.parentNode;

    if (parentNode.style.marginLeft) {
      parentNode.style.marginLeft =
        parseInt(parentNode.style.marginLeft) + 20 + "px";
    } else {
      parentNode.style.marginLeft = "20px";
    }

    editorRef.current.focus();
  }

  function handleOutdent() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const parentNode = range.commonAncestorContainer.parentNode;

    if (parentNode.style.marginLeft) {
      parentNode.style.marginLeft =
        parseInt(parentNode.style.marginLeft) - 20 + "px";
      if (parseInt(parentNode.style.marginLeft) < 20) {
        parentNode.style.marginLeft = "";
      }
    }

    editorRef.current.focus();
  }

  function handleCommand(command, value) {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  }

  return (
    <div style={{ border: "#dde0e4", marginTop: 15 }}>
      <div style={{ marginBottom: 5 }}>Content</div>

      <LegacyCard>
        <LegacyCard.Section>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {showEditor ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  border: "#dde0e4",
                }}
              >
                <ButtonGroup segmented>
                  <div>
                    <Popover
                      active={activeHeading}
                      activator={activatorHeading}
                      autofocusTarget="first-node"
                      onClose={toggleActiveHeading}
                    >
                      <ActionList
                        actionRole="menuitem"
                        sections={[
                          {
                            items: [
                              {
                                content: "Paragraph",
                                onAction: () => {
                                  handleCommand("insertParagraph", "p");
                                  setActiveHeading(false);
                                },
                              },
                              {
                                content: "Heading 1",
                                onAction: () => {
                                  handleCommand("formatBlock", "h1");
                                  setActiveHeading(false);
                                },
                              },
                              {
                                content: "Heading 2",
                                onAction: () => {
                                  handleCommand("formatBlock", "h2");
                                  setActiveHeading(false);
                                },
                              },
                              {
                                content: "Heading 3",
                                onAction: () => {
                                  handleCommand("formatBlock", "h3");
                                  setActiveHeading(false);
                                },
                              },
                              {
                                content: "Heading 4",
                                onAction: () => {
                                  handleCommand("formatBlock", "h4");
                                  setActiveHeading(false);
                                },
                              },
                              {
                                content: "Heading 5",
                                onAction: () => {
                                  handleCommand("formatBlock", "h5");
                                  setActiveHeading(false);
                                },
                              },
                              {
                                content: "Heading 6",
                                onAction: () => {
                                  handleCommand("formatBlock", "h6");
                                  setActiveHeading(false);
                                },
                              },
                            ],
                          },
                        ]}
                      />
                    </Popover>
                  </div>
                  <Tooltip content="Bold" dismissOnMouseOut>
                    <Button
                      icon={<FaBold />}
                      onClick={() => {
                        handleFormat();
                      }}
                    />
                  </Tooltip>
                  <Tooltip content="Italic" dismissOnMouseOut>
                    <Button
                      icon={<FaItalic />}
                      onClick={() => handleFormat("i")}
                    />
                  </Tooltip>
                  <Tooltip content="Underline" dismissOnMouseOut>
                    <Button
                      icon={<FaUnderline />}
                      // onClick={() => handleFormat("u")}
                      onClick={() => clearSelectionFormatting("u")}
                    />
                  </Tooltip>
                </ButtonGroup>
                <ButtonGroup segmented>
                  <Tooltip content="Bulleted list" dismissOnMouseOut>
                    <Button
                      icon={<FaListUl />}
                      onClick={() => handleFormat("li")}
                    />
                  </Tooltip>

                  <Tooltip content="Numbered list" dismissOnMouseOut>
                    <Button
                      icon={<FaListOl />}
                      onClick={() => handleFormat("li")}
                    />
                  </Tooltip>

                  <Tooltip content="Outdent" dismissOnMouseOut>
                    <Button
                      icon={<FaOutdent />}
                      onClick={() => handleOutdent()}
                    />
                  </Tooltip>

                  <Tooltip content="Indent" dismissOnMouseOut>
                    <Button
                      icon={<FaIndent />}
                      onClick={() => handleIndent()}
                    />
                  </Tooltip>
                </ButtonGroup>
                <ButtonGroup segmented>
                  <div>
                    <Popover
                      active={activeAlign}
                      activator={activatorAlign}
                      autofocusTarget="first-node"
                      onClose={toggleActiveAlign}
                    >
                      <ActionList
                        actionRole="menuitem"
                        items={[
                          {
                            content: "Left align",
                            onAction: () => handleCommand("justifyLeft"),
                          },
                          {
                            content: "Center align",
                            onAction: () => handleCommand("justifyCenter"),
                          },
                          {
                            content: "Right align",
                            onAction: () => handleCommand("justifyRight"),
                          },
                        ]}
                      />
                    </Popover>
                  </div>
                  <div>
                    <Popover
                      active={activePickColor}
                      activator={activatorPickColor}
                      autofocusTarget="first-node"
                      onClose={toggleActivePickColor}
                    >
                      <div
                        style={{
                          width: "220px",
                        }}
                      >
                        <Tabs
                          tabs={tabColors}
                          selected={tabColor}
                          onSelect={handleTabChange}
                          fitted
                        ></Tabs>
                      </div>
                      <div style={{ padding: "10px" }}>
                        <ColorPicker
                          color={tabColor === 0 ? color : bgColor}
                          onChange={(value) => {
                            if (tabColor === 0) {
                              setColor(value);
                              handleCommand("foreColor", convertHLS(color));
                            } else {
                              setBgColor(value);
                              handleCommand("backColor", convertHLS(color));
                            }
                          }}
                        />
                      </div>
                      <div
                        style={{ width: "80%", padding: "0px 10px 20px 10px" }}
                      >
                        <TextField
                          value={
                            tabColor === 0
                              ? convertHLS(color)
                              : convertHLS(bgColor)
                          }
                          prefix={
                            <div
                              style={{
                                width: "25px",
                                height: "25px",
                                background: `${
                                  tabColor === 0
                                    ? convertHLS(color)
                                    : convertHLS(bgColor)
                                }`,
                                borderRadius: "50%",
                              }}
                            ></div>
                          }
                        />
                      </div>
                    </Popover>
                  </div>
                </ButtonGroup>
                <ButtonGroup segmented>
                  <Tooltip content="Insert tabble" dismissOnMouseOut>
                    <div>
                      <Popover
                        active={activeTable}
                        activator={activatorTable}
                        autofocusTarget="first-node"
                        onClose={toggleActiveTable}
                      >
                        <ActionList
                          actionRole="menuitem"
                          sections={[
                            {
                              title: "Insert table",
                              items: [
                                {
                                  content: "Insert row above",
                                },
                                { content: "Insert row below" },
                                {
                                  content: "Insert column before",
                                },
                                {
                                  content: "Insert column after",
                                },
                                { content: "Delete row" },
                                {
                                  content: "Delete column",
                                },
                                {
                                  content: "Delete table",
                                },
                              ],
                            },
                          ]}
                        />
                      </Popover>
                    </div>
                  </Tooltip>

                  <Tooltip content="Insert image" dismissOnMouseOut>
                    <Button icon={<BsImage />} />
                  </Tooltip>
                  <Tooltip content="Insert video" dismissOnMouseOut>
                    <Button icon={<BsFillCameraVideoFill />} />
                  </Tooltip>
                  <Tooltip content="Clear formating" dismissOnMouseOut>
                    <Button icon={<GrClear />} />
                  </Tooltip>
                </ButtonGroup>
              </div>
            ) : (
              ""
            )}
            <Tooltip content="Show HTML">
              <Button color="base" onClick={toggleShowEditor}>
                <Icon source={EmbedMinor} color="base" />
              </Button>
            </Tooltip>
          </div>
        </LegacyCard.Section>

        <LegacyCard.Subsection>
          <div
            ref={editorRef}
            onInput={handleInput}
            contentEditable
            className="editor-container"
            spellCheck="false"
            style={{
              border: "2px solid #dde0e4",
              padding: "5px",
              lineHeight: "1.6",
              outline: "none",
              height: "150px",
            }}
          ></div>
        </LegacyCard.Subsection>
      </LegacyCard>
    </div>
  );
}
