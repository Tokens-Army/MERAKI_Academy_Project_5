import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

export default function ResponsiveDateTimePickers() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "DateTimePicker",
          "MobileDateTimePicker",
          "DesktopDateTimePicker",
          "StaticDateTimePicker",
        ]}
      >
        <DemoItem label="Static variant">
          <StaticDateTimePicker
            defaultValue={dayjs("2023-08-28T15:30")}
            onChange={(newvalue) => {
              const arr = String(newvalue.$d).split(" ");
              arr.splice(5, 2);
              console.log(arr.join(" "));
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
