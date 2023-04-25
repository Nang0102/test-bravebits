// import { useState } from "react";
// import { TextField, Icon, Select } from "@shopify/polaris";

// export function TimePickerSelector() {
//   const [time, setTime] = useState("");

//   // Create an array of Date objects for every 30 minutes
//   const times = [];
//   const date = new Date();
//   date.setMinutes(0);
//   date.setSeconds(0);
//   date.setMilliseconds(0);

//   for (let i = 0; i < 48; i++) {
//     times.push(new Date(date.getTime() + i * 30 * 60000));
//   }
//   console.log("time", times);
//   // Format the date objects to display as time
//   const options = times.map((time) => ({
//     label: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//     value: time.toISOString(),
//   }));

//   console.log("option", options);
//   return (
//     <div style={{ display: "flex" }}>
//       <div style={{ marginRight: "10px" }}>
//         <Icon source="ClockMajorMonotone" />
//       </div>
//       <div style={{ flex: "1" }}>
//         <TextField
//           label="Choose a time"
//           type="time"
//           value={time}
//           onChange={setTime}
//         >
//           <select
//             value={time}
//             onChange={(event) => setTime(event.target.value)}
//           >
//             {options}
//           </select>
//         </TextField>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { TextField, Icon } from "@shopify/polaris";

export function TimePickerSelector() {
  const [time, setTime] = useState("");

  // Create an array of Date objects for every 30 minutes
  const times = [];
  const date = new Date();
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  for (let i = 0; i < 48; i++) {
    times.push(new Date(date.getTime() + i * 30 * 60000));
  }

  // Format the date objects to display as time
  const timeOptions = times.map((time) => (
    <option key={time.toISOString()} value={time.toISOString()}>
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </option>
  ));

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "10px" }}>
        <Icon source="ClockMajorMonotone" />
      </div>
      <div style={{ flex: "1" }}>
        <TextField
          label="Choose a time"
          type="time"
          value={time}
          onChange={setTime}
        >
          <select
            value={time}
            onChange={(event) => setTime(event.target.value)}
          >
            {timeOptions}
          </select>
        </TextField>
      </div>
    </div>
  );
}
