import React, { useState, useCallback, useEffect } from "react";
import {
  LegacyCard,
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

export function PageContent({
  content,
  editorRef,
  handleContentChange,
  setIsUpdated,
}) {
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

  function handleFormat(style) {
    const selection = window.getSelection();
    if (!selection) {
      return;
    }
    const range = selection.getRangeAt(0);
    if (!range) {
      return;
    }
    if (selection.anchorNode.parentNode.tagName != "SPAN") {
      const styledElement = document.createElement("span");

      switch (style) {
        case "b":
          styledElement.style.fontWeight = "bold";
          break;
        case "i":
          styledElement.style.fontStyle = "italic";
          break;
        case "u":
          styledElement.style.textDecoration = "underline";
          styledElement.style.display = "inline-block";
          break;
        default:
          break;
      }
      setIsUpdated(false);

      // apply a new style
      styledElement.appendChild(range.extractContents());
      range.insertNode(styledElement);
    } else {
      const parentNode = selection.anchorNode.parentNode;

      switch (style) {
        case "b":
          let currentParentFontWeight = parentNode.style.fontWeight;
          const newSpan = document.createElement("span");
          newSpan.textContent = range.toString();

          currentParentFontWeight == "bold"
            ? (newSpan.style.fontWeight = "normal")
            : (newSpan.style.fontWeight = "bold");
          range.deleteContents();
          range.insertNode(newSpan);
          break;
        case "i":
          let currentParentFontStyle = parentNode.style.fontStyle;

          const newStyle = document.createElement("span");
          newStyle.textContent = range.toString();

          currentParentFontStyle == "italic"
            ? (newStyle.style.fontStyle = "normal")
            : (newStyle.style.fontStyle = "italic");
          range.deleteContents();
          range.insertNode(newStyle);

          break;
        case "u":
          let currentParentTextDecoration = parentNode.style.textDecoration;
          let display = parentNode.style.display;
          const newTextDecoration = document.createElement("span");
          newTextDecoration.textContent = range.toString();

          if (
            currentParentTextDecoration == "underline" &&
            display == "inline-block"
          ) {
            newTextDecoration.style.textDecoration = "normal";
          } else {
            newTextDecoration.style.textDecoration = "underline";
          }
          newTextDecoration.style.display = "inline-block";
          range.deleteContents();
          range.insertNode(newTextDecoration);
          break;
        default:
          break;
      }
    }
    setIsUpdated(false);
    selection.removeAllRanges();
    selection.addRange(range);

    deSelectText();
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
                        handleFormat("b");
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
                      onClick={() => handleFormat("u")}
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
                      onClick={() => handleFormat()}
                    />
                  </Tooltip>

                  <Tooltip content="Indent" dismissOnMouseOut>
                    <Button
                      icon={<FaIndent />}
                      onClick={() => handleFormat()}
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
