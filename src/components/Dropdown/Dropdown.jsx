import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown({ items, defaultValue, onChange }) {
  const [data, setData] = React.useState(defaultValue);

  const handleChange = (event) => {
    setData(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Entity Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data}
          label="Entity Type"
          onChange={handleChange}
        >
          {items?.map((item) => {
            return (
              <MenuItem key={item?.id} value={item?.value}>
                {item?.value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
