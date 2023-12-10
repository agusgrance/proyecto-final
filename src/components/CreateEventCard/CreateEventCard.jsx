import clsx from "clsx";
import React from "react";
import DateRangePickerComponent from "../DateRangePicker/DateRangePicker";
import ColorPickerComponent from "../ColorPicker/ColorPicker";
import { Button, TextField } from "@material-ui/core";

import UserSelector from "../UserSelector/UserSelector";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup.object().shape({
  title: yup.string().required("The Title is a required field."),
  startDate: yup.date().required("The Start Date is a required field."),
  endDate: yup.date().required("The End Date is a required field."),
  color: yup.string(),
  guests: yup.array().of(yup.string()),
});
export function CreateEventCard({ type, event }) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <form
      className={clsx(
        "flex  flex-col gap-2 justify-between items-center w-full h-full rounded-xl  px-24 py-6 shadow-2xl	bg-white"
      )}
    >
      <h5 className="text-[25px] font-bold m-0">Create Event</h5>
      <TextField {...register("title")} label="Title" className="w-full" />
      <DateRangePickerComponent />
      <div className="flex w-full gap-4 items-center justify-between ">
        <ColorPickerComponent />
        <UserSelector />
      </div>

      <div className="flex gap-4">
        <Button variant="contained">Cancelar</Button>
        <Button variant="contained" disabled={!isValid}>
          Agregar
        </Button>
      </div>
    </form>
  );
}
