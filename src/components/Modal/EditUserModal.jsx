import { Button, TextField, Avatar } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "./Modal";
import * as yup from "yup";
import clsx from "clsx";
import md5 from "md5";
import { updateUser } from "../../api/Guest/updateUser";

const EditUserModal = ({ open, onClose, user, onConfirm }) => {
  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Debes confirmar tu contraseña"),
  });
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: user,
    mode: "all",
  });

  React.useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user]);
  const onSubmitHandler = async (data) => {
    try {
      const { email, password, username } = data;
      const avatar =
        "https://api.dicebear.com/7.x/adventurer/svg?seed=" + username + ".svg";

      const body = {
        username,
        email,
        password: md5(password),
        avatar,
      };
      const response = await updateUser(user.id, body);

      reset();
      return onConfirm?.();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Modal visible={open} handleClose={onClose}>
      <div className=" bg-white w-full h-fit rounded-xl shadow-2xl	p-10">
        <div className="flex flex-col gap-3 items-center pb-6">
          <Avatar
            src={user?.avatar || ""}
            sx={{ width: "100px", height: "100px" }}
          />
          <form
            className="flex flex-col w-full gap-8"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div className="flex flex-col gap-8 w-full mt-8">
              <TextField
                {...register("username")}
                label="Username"
                variant="outlined"
              />
              <TextField
                {...register("email")}
                label="Email"
                variant="outlined"
              />
              <TextField
                {...register("password")}
                label="New Password"
                variant="outlined"
                type="password"
              />
              <TextField
                {...register("confirmPassword")}
                label="Confirm new Password"
                variant="outlined"
                type="password"
              />
            </div>
            <div className="w-full">
              <Button
                type="submit"
                variant="contained"
                className={clsx("w-full", { ["!bg-[#673ab7]"]: isValid })}
                disabled={!isValid}
              >
                Editar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditUserModal;
