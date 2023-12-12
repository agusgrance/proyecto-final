export const removeGuestList = async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_PUBLIC_URL}/guestsList/${id}`,
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
