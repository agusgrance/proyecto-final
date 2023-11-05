import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import md5 from "md5";

const SignIn = () => {
  let location = useLocation();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  if (sessionStorage.getItem("token")) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  const onSubmitHandler = async (data) => {
    try {
      const { email, password } = data;
      const body = {
        username: email,
        password: md5(password),
      };
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const { token } = await response.json();

      sessionStorage.setItem("token", token);

      reset();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#eef2f6] overflow-hidden">
      <div className=" bg-white w-full h-fit max-w-[476px] max-h-[60vh] rounded-xl shadow-2xl	p-10">
        <div className="flex flex-col border-b border-solid border-[#e3e8ef] gap-3 items-center pb-6">
          <h4 className="text-[1.5rem] font-bold text-[#673ab7]">
            Hi, Welcome Back
          </h4>
          <h6 className="text-base font-normal text-[#697586]">
            Enter your credentials to continue
          </h6>
          <form
            className="flex flex-col w-full gap-8"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div className="flex flex-col gap-8 w-full mt-8">
              <TextField
                {...register("email")}
                label="Email"
                variant="outlined"
              />
              <TextField
                {...register("password")}
                label="Password"
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
                Sign In
              </Button>
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center p-4">
          <Link to={"/sign-up"}>
            <p className="text-[#121926] text-[1rem] font-normal">
              Don't you have an account?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
