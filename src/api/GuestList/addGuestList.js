export const addGuestList = async (guestList) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/guestsList`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(guestList),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
