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
    editorRef.current.innerHTML = content;
  }, [content]);

  const handleInput = (event) => {
    const content = event.target.innerHTML;
    console.log("content", content);
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

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  function handleCommand(command, value) {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  }
  return (
    <div style={{ border: "#dde0e4" }}>
      <Text>Content</Text>

      <LegacyCard>
        <LegacyCard.Section>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                      onClick={() => handleFormat("bold")}
                    />
                  </Tooltip>
                  <Tooltip content="Italic" dismissOnMouseOut>
                    <Button
                      icon={<FaItalic />}
                      onClick={() => handleFormat("italic")}
                    />
                  </Tooltip>
                  <Tooltip content="Underline" dismissOnMouseOut>
                    <Button
                      icon={<FaUnderline />}
                      onClick={() => handleFormat("underline")}
                    />
                  </Tooltip>
                </ButtonGroup>
                <ButtonGroup segmented>
                  <Tooltip content="Bulleted list" dismissOnMouseOut>
                    <Button
                      icon={<FaListUl />}
                      onClick={() => handleFormat("insertOrderedList")}
                    />
                  </Tooltip>

                  <Tooltip content="Numbered list" dismissOnMouseOut>
                    <Button
                      icon={<FaListOl />}
                      onClick={() => handleFormat("insertUnorderedList")}
                    />
                  </Tooltip>

                  <Tooltip content="Outdent" dismissOnMouseOut>
                    <Button
                      icon={<FaOutdent />}
                      onClick={() => handleFormat("outdent")}
                    />
                  </Tooltip>

                  <Tooltip content="Indent" dismissOnMouseOut>
                    <Button
                      icon={<FaIndent />}
                      onClick={() => handleFormat("indent")}
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
                                // background: `red`,
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
                    {/* <Button
                    icon={<BsTable />}
                    onClick={() => handleFormat("underline")}
                  /> */}
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
                    <Button
                      icon={<BsImage />}
                      // onClick={() => handleFormat("underline")}
                    />
                  </Tooltip>
                  <Tooltip content="Insert video" dismissOnMouseOut>
                    <Button
                      icon={<BsFillCameraVideoFill />}
                      // onClick={() => handleFormat("underline")}
                    />
                  </Tooltip>
                  <Tooltip content="Clear formating" dismissOnMouseOut>
                    <Button
                      icon={<GrClear />}
                      // onClick={() => handleFormat("underline")}
                    />
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
