import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import DateRangePickerComponent from "../DateRangePicker/DateRangePicker";
import ColorPickerComponent from "../ColorPicker/ColorPicker";
import { Button, TextField } from "@material-ui/core";

import UserSelector from "../UserSelector/UserSelector";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postEvent } from "../../api/Event/postEvent";
import { EventContext } from "../../store/Events";
import DragDrop from "../DragDrop/DragDrop";
const schema = yup.object().shape({
  title: yup.string().required("The Title is a required field."),
  description: yup.string(),
  location: yup.string(),
  startDate: yup.date().required("The Start Date is a required field."),
  endDate: yup.date().required("The End Date is a required field."),
  color: yup.string(),
  guests: yup.array().of(yup.string()),
});

const initForm = {
  title: null,
  startDate: null,
  endDate: null,
  color: "#333",
  guests: [],
};
export function CreateEventCard() {
  const [color, setColor] = useState(initForm.color);
  const [users, setUsers] = useState([]);
  const [image, setImage] = useState();

  const { loadEvents } = useContext(EventContext);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    trigger,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initForm,
    mode: "onChange",
  });

  const onReset = () => {
    reset();
    setValue("color", initForm.color);
    trigger("color");
    setColor(initForm.color);
    setUsers([]);
    setImage();
    trigger("guests");
  };

  const handleColorChange = (color) => {
    setValue("color", color);
    trigger("color");
    setColor(color);
  };
  const handleGuestChange = (guestList) => {
    setValue("guests", guestList);
    trigger("guests");
    setUsers(guestList);
  };
  const onSubmitHandler = async (formData) => {
    await postEvent({ ...formData, image });
    onReset();
    loadEvents();
  };
  const handleImage = (file) => {
    setImage(file);
  };
  return (
    <form
      className={clsx(
        "flex flex-col gap-2 justify-between items-center w-full h-full rounded-xl  px-24 py-6 shadow-2xl	bg-white"
      )}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h5 className="text-[25px] font-bold m-0">Create Event</h5>
      <TextField {...register("title")} label="Title" className="w-full" />
      <div className="flex w-full gap-4 items-center justify-between ">
        <TextField
          {...register("location")}
          label="Location"
          className="w-full"
        />
        <TextField
          {...register("description")}
          label="Description"
          className="w-full"
        />
      </div>
      <DateRangePickerComponent
        setDateValue={setValue}
        dateValue={{
          startDate: getValues("startDate"),
          endDate: getValues("endDate"),
        }}
      />

      <div className="flex w-full gap-4 items-center justify-between ">
        <ColorPickerComponent color={color} onColorChange={handleColorChange} />
        <UserSelector users={users} setUsers={handleGuestChange} />
      </div>
      <DragDrop handleImage={handleImage} image={image} />

      <div className="flex gap-4">
        <Button type="button" variant="contained" onClick={onReset}>
          Limpiar
        </Button>
        <Button type="submit" variant="contained" disabled={!isValid}>
          Agregar
        </Button>
      </div>
    </form>
  );
}
