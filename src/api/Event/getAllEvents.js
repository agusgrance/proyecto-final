export const getAllEvents = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};
