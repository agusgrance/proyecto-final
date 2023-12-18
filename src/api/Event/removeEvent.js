export const removeEvent = async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_PUBLIC_URL}/events/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data;
};
