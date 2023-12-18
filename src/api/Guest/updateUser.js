export const updateUser = async (userId, userData) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/guests/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
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
