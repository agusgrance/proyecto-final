import { jwtDecode } from "jwt-decode";

export const getMyUser = () => {
  const token = sessionStorage.getItem("token");

  return token ? jwtDecode(token) : null;
};
