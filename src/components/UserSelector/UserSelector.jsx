import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Avatar,
  Chip,
} from "@material-ui/core";
import { getUserList } from "../../api/Guest/getUsers";
import { getMyUser } from "../../hooks/UseMyUser";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "50%",
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
}));

const UserSelector = ({ users, setUsers }) => {
  const classes = useStyles();
  const [usersList, setUsersList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(users);
  const user = getMyUser();

  const handleUserChange = (event) => {
    setSelectedUsers(event.target.value);
    setUsers(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUserList();
      setUsersList(users);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedUsers(users);
  }, [users]);

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
                    alt={usersList.find((user) => user.id === userId)?.username}
                    src={usersList.find((user) => user.id === userId)?.avatar}
                  />
                }
                label={usersList.find((user) => user.id === userId)?.username}
                className={usersList.chip}
              />
            ))}
          </div>
        )}
      >
        {usersList.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            <Avatar alt={user.name} src={user.avatar} />
            {user.username}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserSelector;
