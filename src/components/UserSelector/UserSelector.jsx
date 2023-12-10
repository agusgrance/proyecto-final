import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Avatar,
  Chip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "30%",
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
}));

const users = [
  {
    id: "user1",
    name: "Usuario 1",
    avatar: "https://avatars.dicebear.com/api/initials/jh.svg",
  },
  {
    id: "user2",
    name: "Usuario 2",
    avatar: "https://avatars.dicebear.com/api/initials/jh.svg",
  },
  {
    id: "user3",
    name: "Usuario 3",
    avatar: "https://avatars.dicebear.com/api/initials/jh.svg",
  },

  // Agrega más usuarios según sea necesario
];

const UserSelector = () => {
  const classes = useStyles();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserChange = (event) => {
    setSelectedUsers(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="user-selector-label">Seleccionar Usuarios</InputLabel>
      <Select
        labelId="user-selector-label"
        id="user-selector"
        multiple
        value={selectedUsers}
        onChange={handleUserChange}
        renderValue={(selected) => (
          <div>
            {selected.map((userId) => (
              <Chip
                key={userId}
                avatar={
                  <Avatar
                    alt={users.find((user) => user.id === userId)?.name}
                    src={users.find((user) => user.id === userId)?.avatar}
                  />
                }
                label={users.find((user) => user.id === userId)?.name}
                className={classes.chip}
              />
            ))}
          </div>
        )}
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            <Avatar alt={user.name} src={user.avatar} />
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserSelector;
