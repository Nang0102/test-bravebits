import React, { useState, useCallback } from "react";
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
import { MdOutlineFormatColorText } from "react-icons/md";
import { TypeMinor } from "@shopify/polaris-icons";
import { convertHLS } from "../utilities/convertHLS";

function PageContent() {
  const [activeHeading, setActiveheading] = useState(true);
  const [activeAlign, setActiveAlign] = useState(true);
  const [activePickColor, setActivePickColor] = useState(true);
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

  const handleTabChange = useCallback(
    (selectedTabIndex) => setTabColor(selectedTabIndex),
    []
  );
  const toggleActiveHeading = useCallback(
    () => setActiveheading((active) => !active),
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
  return (
    <div>
      <Text>Content</Text>

      <LegacyCard>
        <LegacyCard.Section>
          <div
            style={{
              display: "flex",
              gap: "8px",
              padding: "5px",
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
                        title: "Paragraph",
                        items: [
                          {
                            active: true,
                            content: "Heading 1",
                          },
                          { content: "Heading 2" },
                          {
                            content: "Heading 3",
                          },
                          {
                            content: "Heading 4",
                          },
                          { content: "Heading 5" },
                          {
                            content: "Heading 6",
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
                  // onClick={() => handleFormat("bold")}
                />
              </Tooltip>
              <Tooltip content="Italic" dismissOnMouseOut>
                <Button
                  icon={<FaItalic />}
                  // onClick={() => handleFormat("italic")}
                />
              </Tooltip>
              <Tooltip content="Underline" dismissOnMouseOut>
                <Button
                  icon={<FaUnderline />}
                  // onClick={() => handleFormat("underline")}
                />
              </Tooltip>
            </ButtonGroup>
            <ButtonGroup segmented>
              <Tooltip content="Bulleted list" dismissOnMouseOut>
                <Button
                  icon={<FaListUl />}
                  // onClick={() => handleFormat("insertOrderedList")}
                />
              </Tooltip>

              <Tooltip content="Numbered list" dismissOnMouseOut>
                <Button
                  icon={<FaListOl />}
                  // onClick={() => handleFormat("insertUnorderedList")}
                />
              </Tooltip>

              <Tooltip content="Outdent" dismissOnMouseOut>
                <Button
                  icon={<FaOutdent />}
                  // onClick={() => handleFormat("outdent")}
                />
              </Tooltip>

              <Tooltip content="Indent" dismissOnMouseOut>
                <Button
                  icon={<FaIndent />}
                  // onClick={() => handleFormat("indent")}
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
                        // onAction: () => handleCommand("justifyLeft"),
                      },
                      {
                        content: "Center align",
                        // onAction: () => handleCommand("justifyCenter"),
                      },
                      {
                        content: "Right align",
                        // onAction: () => handleCommand("justifyRight"),
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
                          // handleCommand("foreColor", convertHSL(color));
                        } else {
                          setBgColor(value);
                          // handleCommand("backColor", convertHSL(color));
                        }
                      }}
                    />
                  </div>
                  <div style={{ width: "80%", padding: "0px 10px 20px 10px" }}>
                    <TextField
                      value={
                        tabColor === 0 ? convertHLS(color) : convertHLS(bgColor)
                      }
                      prefix={
                        <div
                          style={{
                            width: "25px",
                            height: "25px",
                            //  background: `${
                            //     tabColor === 0
                            //     ? convertHSL(color)
                            //     : convertHSL(bgColor)
                            // }`,
                            background: `red`,
                            borderRadius: "50%",
                          }}
                        ></div>
                      }
                    />
                  </div>
                </Popover>
              </div>
            </ButtonGroup>
          </div>
        </LegacyCard.Section>
        <LegacyCard.Subsection>
          <div
            // ref={editorRef}
            contentEditable
            className="editor-container"
            spellCheck="false"
            style={{
              border: "2px solid #ccc",
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

export default PageContent;
