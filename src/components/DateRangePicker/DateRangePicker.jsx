import React, { useEffect, useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DateRangePickerComponent = ({ setDateValue, dateValue }) => {
  const [selectedDateRange, setSelectedDateRange] = useState(dateValue);

  const handleDateChange = (dateType, date) => {
    setSelectedDateRange((prevDateRange) => ({
      ...prevDateRange,
      [dateType]: date,
    }));
    setDateValue(dateType, date);
  };

  useEffect(() => {
    setSelectedDateRange(dateValue);
  }, [dateValue]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="flex w-full justify-between">
        <KeyboardDatePicker
          className="w-full"
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="start-date-picker"
          label="Fecha de inicio"
          value={selectedDateRange.startDate}
          onChange={(date) => handleDateChange("startDate", date)}
          KeyboardButtonProps={{
            "aria-label": "Cambiar fecha de inicio",
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="start-time-picker"
          label="Hora de inicio"
          value={selectedDateRange.startDate}
          onChange={(date) => handleDateChange("startDate", date)}
          KeyboardButtonProps={{
            "aria-label": "Cambiar hora de inicio",
          }}
        />
      </div>
      <div className="flex w-full justify-between">
        <KeyboardDatePicker
          className="w-full"
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="end-date-picker"
          label="Fecha de fin"
          value={selectedDateRange.endDate}
          minDate={selectedDateRange.startDate}
          onChange={(date) => handleDateChange("endDate", date)}
          KeyboardButtonProps={{
            "aria-label": "Cambiar fecha de fin",
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="end-time-picker"
          label="Hora de fin"
          value={selectedDateRange.endDate}
          onChange={(date) => handleDateChange("endDate", date)}
          KeyboardButtonProps={{
            "aria-label": "Cambiar hora de fin",
          }}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default DateRangePickerComponent;
