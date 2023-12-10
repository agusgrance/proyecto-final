import React, { useState } from "react";
import { CirclePicker } from "react-color";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  colorPickerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  colorPickerPaper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const ColorPickerComponent = () => {
  const classes = useStyles();
  const [selectedColor, setSelectedColor] = useState("#333");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    setIsModalOpen(false);
  };
  const onSelectColor = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button
        className="flex items-center gap-4"
        type="button"
        onClick={onSelectColor}
      >
        <div
          className={"w-6 h-6 rounded-full"}
          style={{ backgroundColor: selectedColor }}
        ></div>

        <h6>{selectedColor}</h6>
      </button>
      {isModalOpen && (
        <div className={clsx(classes.colorPickerContainer, "absolute z-50")}>
          <Paper elevation={3} className={classes.colorPickerPaper}>
            <Typography variant="h6" gutterBottom>
              Selecciona un color
            </Typography>
            <CirclePicker color={selectedColor} onChange={handleColorChange} />
          </Paper>
        </div>
      )}
    </div>
  );
};

export default ColorPickerComponent;
