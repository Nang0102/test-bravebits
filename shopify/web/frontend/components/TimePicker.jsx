import { useState } from "react";
import { ClockMajor } from "@shopify/polaris-icons";
import {
  TextField,
  OptionList,
  VerticalStack,
  Popover,
  Button,
} from "@shopify/polaris";

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export function TimePickerSelector() {
  // Create an array of Date objects for every 30 minutes
  const times = [];
  const date = new Date();
  date.setMinutes(0);
  date.setSeconds(0);

  for (let i = 0; i < 48; i++) {
    times.push(new Date(date.getTime() + i * 30 * 60000));
  }
  // Format the date objects to display as time
  const timeOptions = times.map((time) => ({
    label: formatAMPM(time),
    value: time.toISOString(),
  }));

  const [selected, setSelected] = useState(timeOptions[0]);
  const [popoverActive, setPopoverActive] = useState(false);
  return (
    <VerticalStack gap="4">
      <Popover
        fullWidth
        autofocusTarget="none"
        preferredAlignment="left"
        preferInputActivator={false}
        preferredPosition="below"
        activator={
          <Button
            onClick={() => setPopoverActive(!popoverActive)}
            icon={ClockMajor}
            fullWidth
            textAlign="start"
          >
            <p style={{ marginLeft: "6px" }}>{selected.label}</p>
          </Button>
        }
        active={popoverActive}
      >
        <OptionList
          options={timeOptions.map((timeOption) => ({
            value: timeOption.value,
            label: timeOption.label,
          }))}
          selected={selected.label}
          onChange={(value) => {
            console.log("value", value);
            console.log("selected", selected.label);
            setSelected(
              timeOptions.find((timeOption) => timeOption.value === value[0])
            );
            setPopoverActive(false);
          }}
        />
      </Popover>
    </VerticalStack>
  );
}
