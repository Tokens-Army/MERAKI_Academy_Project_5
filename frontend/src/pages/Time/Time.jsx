import axios from "axios";
import {
  LocalizationProvider,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import React from "react";
import { useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Time = () => {
  const order_id = useSelector((state) => {
    return state.order.order.id;
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["StaticDateTimePicker"]}>
        <DemoItem>
          <StaticDateTimePicker
            defaultValue={dayjs("2023-10-10T15:30")}
            onChange={(value) => {
              const selectedDate = String(value.$d).split(" ");
              selectedDate.splice(5, 2);
              axios
                .put(`http://localhost:5000/orders/update_time/${order_id}`, {
                  scheduled_time: selectedDate.join(" "),
                })
                .then((res) => {})
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Time;
